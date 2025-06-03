
import { useCallback, useRef } from 'react';

let isPlaying = false;
let currentOscillator: OscillatorNode | null = null;
let currentGainNode: GainNode | null = null;
let loopingSound: { oscillator: OscillatorNode; gainNode: GainNode; type: string } | null = null;

export const useSoundEffects = () => {
  const lastSoundTime = useRef(0);

  const stopSound = useCallback(() => {
    // Stop looping sounds
    if (loopingSound) {
      try {
        loopingSound.gainNode.gain.exponentialRampToValueAtTime(0.001, loopingSound.gainNode.context.currentTime + 0.1);
        loopingSound.oscillator.stop(loopingSound.oscillator.context.currentTime + 0.1);
      } catch (e) {
        // Ignore errors
      }
      loopingSound = null;
    }

    // Stop regular sounds
    if (currentOscillator && currentGainNode) {
      try {
        currentGainNode.gain.exponentialRampToValueAtTime(0.001, currentGainNode.context.currentTime + 0.1);
        currentOscillator.stop(currentGainNode.context.currentTime + 0.1);
        currentOscillator = null;
        currentGainNode = null;
        isPlaying = false;
      } catch (e) {
        currentOscillator = null;
        currentGainNode = null;
        isPlaying = false;
      }
    }
  }, []);

  const playDialToneLoop = useCallback(() => {
    // Stop any existing sounds first
    stopSound();

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Create dial tone (350Hz + 440Hz dual tone like real phone)
      oscillator.frequency.setValueAtTime(350, audioContext.currentTime);
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
      
      oscillator.start(audioContext.currentTime);
      
      // Store looping sound reference
      loopingSound = { oscillator, gainNode, type: 'dial_tone' };
      
      // Create pulsing effect (ring pattern)
      const pulseInterval = setInterval(() => {
        if (loopingSound && loopingSound.gainNode) {
          try {
            const currentTime = loopingSound.gainNode.context.currentTime;
            loopingSound.gainNode.gain.cancelScheduledValues(currentTime);
            loopingSound.gainNode.gain.setValueAtTime(0.08, currentTime);
            loopingSound.gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.5);
            loopingSound.gainNode.gain.exponentialRampToValueAtTime(0.08, currentTime + 1.0);
          } catch (e) {
            clearInterval(pulseInterval);
          }
        } else {
          clearInterval(pulseInterval);
        }
      }, 1000);
      
      oscillator.onended = () => {
        clearInterval(pulseInterval);
        loopingSound = null;
      };
    } catch (error) {
      console.log('Audio not supported or blocked');
    }
  }, [stopSound]);

  const playSound = useCallback((type: 'success' | 'warning' | 'click' | 'bonus' | 'celebration' | 'cash_register' | 'ticking' | 'airhorn' | 'alert_ping') => {
    // Don't interrupt looping sounds with regular sounds
    if (loopingSound && (type === 'click' || type === 'warning')) {
      return;
    }

    // Prevent overlapping non-urgent sounds
    const now = Date.now();
    if (now - lastSoundTime.current < 300 && type !== 'cash_register' && type !== 'airhorn') {
      return;
    }

    // Stop any current non-looping sound
    if (currentOscillator && currentGainNode) {
      try {
        currentGainNode.gain.exponentialRampToValueAtTime(0.001, currentGainNode.context.currentTime + 0.05);
        currentOscillator.stop(currentGainNode.context.currentTime + 0.05);
      } catch (e) {
        // Ignore errors
      }
    }

    if (isPlaying && type !== 'cash_register' && type !== 'airhorn') return;

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
      
      // Enhanced sound palette based on QBR map
      switch (type) {
        case 'success':
          oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C note
          oscillator.type = 'sine';
          gainNode.gain.setValueAtTime(0.06, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.3);
          break;
          
        case 'cash_register': // "Cha-ching" sound
          oscillator.frequency.setValueAtTime(659, audioContext.currentTime); // E note
          oscillator.frequency.exponentialRampToValueAtTime(523, audioContext.currentTime + 0.1); // Down to C
          oscillator.type = 'triangle';
          gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.4);
          break;
          
        case 'ticking': // Slow ticking for late uploads
          oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // Low A note
          oscillator.type = 'square';
          gainNode.gain.setValueAtTime(0.04, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.1);
          break;
          
        case 'airhorn': // FOMO alerts and big wins
          oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.2);
          oscillator.type = 'sawtooth';
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.5);
          break;
          
        case 'alert_ping': // Order reassignments
          oscillator.frequency.setValueAtTime(784, audioContext.currentTime); // G note
          oscillator.type = 'sine';
          gainNode.gain.setValueAtTime(0.07, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.2);
          break;
          
        case 'warning':
          oscillator.frequency.setValueAtTime(349, audioContext.currentTime); // F note
          oscillator.type = 'sine';
          gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.25);
          break;
          
        case 'click':
          oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A note
          oscillator.type = 'sine';
          gainNode.gain.setValueAtTime(0.04, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.15);
          break;
          
        case 'bonus':
          oscillator.frequency.setValueAtTime(659, audioContext.currentTime); // E note
          oscillator.type = 'sine';
          gainNode.gain.setValueAtTime(0.06, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.3);
          break;
          
        case 'celebration':
          oscillator.frequency.setValueAtTime(784, audioContext.currentTime); // G note
          oscillator.type = 'sine';
          gainNode.gain.setValueAtTime(0.06, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.4);
          break;
      }
      
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
  }, []);

  const fadeDialTone = useCallback(() => {
    if (loopingSound) {
      try {
        const currentTime = loopingSound.gainNode.context.currentTime;
        loopingSound.gainNode.gain.cancelScheduledValues(currentTime);
        loopingSound.gainNode.gain.exponentialRampToValueAtTime(0.02, currentTime + 0.5); // Fade to very low
      } catch (e) {
        console.log('Error fading dial tone');
      }
    }
  }, []);

  return { 
    playSound, 
    stopSound, 
    playDialToneLoop, 
    fadeDialTone,
    isLooping: !!loopingSound 
  };
};
