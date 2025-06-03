
import { useCallback, useRef } from 'react';

let isPlaying = false;
let currentOscillator: OscillatorNode | null = null;
let currentGainNode: GainNode | null = null;

export const useSoundEffects = () => {
  const lastSoundTime = useRef(0);

  const stopSound = useCallback(() => {
    if (currentOscillator && currentGainNode) {
      try {
        // Fade out quickly instead of abrupt stop
        currentGainNode.gain.exponentialRampToValueAtTime(0.001, currentGainNode.context.currentTime + 0.1);
        currentOscillator.stop(currentGainNode.context.currentTime + 0.1);
        currentOscillator = null;
        currentGainNode = null;
        isPlaying = false;
      } catch (e) {
        // Ignore errors when stopping already stopped oscillator
        currentOscillator = null;
        currentGainNode = null;
        isPlaying = false;
      }
    }
  }, []);

  const playSound = useCallback((type: 'success' | 'warning' | 'click' | 'bonus' | 'celebration') => {
    // Prevent overlapping sounds - minimum 500ms between sounds
    const now = Date.now();
    if (now - lastSoundTime.current < 500) {
      return;
    }

    // Stop any currently playing sound
    stopSound();

    if (isPlaying) return;

    try {
      isPlaying = true;
      lastSoundTime.current = now;

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      currentOscillator = oscillator;
      currentGainNode = gainNode;
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Softer, more pleasant tones
      switch (type) {
        case 'success':
          oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C note
          break;
        case 'warning':
          oscillator.frequency.setValueAtTime(349, audioContext.currentTime); // F note
          break;
        case 'click':
          oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A note
          break;
        case 'bonus':
          oscillator.frequency.setValueAtTime(659, audioContext.currentTime); // E note
          break;
        case 'celebration':
          oscillator.frequency.setValueAtTime(784, audioContext.currentTime); // G note
          break;
      }
      
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime); // Much quieter
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2); // Shorter duration
      
      oscillator.onended = () => {
        isPlaying = false;
        currentOscillator = null;
        currentGainNode = null;
      };
    } catch (error) {
      isPlaying = false;
      currentOscillator = null;
      currentGainNode = null;
      console.log('Audio not supported or blocked');
    }
  }, [stopSound]);

  return { playSound, stopSound };
};
