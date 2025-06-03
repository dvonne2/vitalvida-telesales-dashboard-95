
import { useCallback } from 'react';

export const useSoundEffects = () => {
  const playSound = useCallback((type: 'success' | 'warning' | 'click' | 'bonus' | 'celebration') => {
    // In a real app, you'd play actual audio files
    // For now, we'll use the Web Audio API to create simple beeps
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Different frequencies for different sound types
      switch (type) {
        case 'success':
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
          break;
        case 'warning':
          oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(300, audioContext.currentTime + 0.1);
          break;
        case 'click':
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
          break;
        case 'bonus':
          oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C note
          oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1); // E note
          oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2); // G note
          break;
        case 'celebration':
          oscillator.frequency.setValueAtTime(1047, audioContext.currentTime); // High C
          oscillator.frequency.setValueAtTime(1319, audioContext.currentTime + 0.1); // High E
          oscillator.frequency.setValueAtTime(1568, audioContext.currentTime + 0.2); // High G
          break;
      }
      
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.log('Audio not supported or blocked');
    }
  }, []);

  return { playSound };
};
