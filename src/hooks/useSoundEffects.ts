
import { useCallback, useRef } from 'react';

let isPlaying = false;
let currentOscillator: OscillatorNode | null = null;

export const useSoundEffects = () => {
  const lastSoundTime = useRef(0);

  const playSound = useCallback((type: 'success' | 'warning' | 'click' | 'bonus' | 'celebration') => {
    // Prevent overlapping sounds - minimum 500ms between sounds
    const now = Date.now();
    if (now - lastSoundTime.current < 500) {
      return;
    }

    // Stop any currently playing sound
    if (currentOscillator) {
      try {
        currentOscillator.stop();
        currentOscillator = null;
      } catch (e) {
        // Ignore errors when stopping already stopped oscillator
      }
    }

    if (isPlaying) return;

    try {
      isPlaying = true;
      lastSoundTime.current = now;

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      currentOscillator = oscillator;
      
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
      };
    } catch (error) {
      isPlaying = false;
      currentOscillator = null;
      console.log('Audio not supported or blocked');
    }
  }, []);

  return { playSound };
};
