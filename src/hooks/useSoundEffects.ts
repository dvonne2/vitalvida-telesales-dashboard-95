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
      
      // Create realistic phone ringing tone (dual tone like real phone)
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A note for ring tone
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      
      oscillator.start(audioContext.currentTime);
      
      // Store looping sound reference
      loopingSound = { oscillator, gainNode, type: 'phone_ring' };
      
      // Create realistic ring pattern (ring-ring-pause)
      const ringPattern = () => {
        if (loopingSound && loopingSound.gainNode) {
          try {
            const currentTime = loopingSound.gainNode.context.currentTime;
            loopingSound.gainNode.gain.cancelScheduledValues(currentTime);
            
            // Ring pattern: ON-OFF-ON-OFF-PAUSE
            loopingSound.gainNode.gain.setValueAtTime(0.1, currentTime);
            loopingSound.gainNode.gain.setValueAtTime(0.1, currentTime + 0.4);
            loopingSound.gainNode.gain.setValueAtTime(0.01, currentTime + 0.5);
            loopingSound.gainNode.gain.setValueAtTime(0.1, currentTime + 0.7);
            loopingSound.gainNode.gain.setValueAtTime(0.01, currentTime + 1.1);
            loopingSound.gainNode.gain.setValueAtTime(0.01, currentTime + 2.0);
          } catch (e) {
            // Ignore errors
          }
        }
      };
      
      ringPattern();
      const ringInterval = setInterval(ringPattern, 2000); // Repeat every 2 seconds
      
      oscillator.onended = () => {
        clearInterval(ringInterval);
        loopingSound = null;
      };
    } catch (error) {
      console.log('Audio not supported or blocked');
    }
  }, [stopSound]);

  const playSound = useCallback((type: 'success' | 'warning' | 'click' | 'bonus' | 'celebration' | 'cash_register' | 'ticking' | 'airhorn' | 'alert_ping' | 'camera_shutter' | 'whoosh') => {
    // Don't interrupt looping sounds with regular sounds
    if (loopingSound && (type === 'click' || type === 'warning')) {
      return;
    }

    // Prevent overlapping non-urgent sounds
    const now = Date.now();
    if (now - lastSoundTime.current < 300 && type !== 'cash_register' && type !== 'airhorn' && type !== 'camera_shutter') {
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

    if (isPlaying && type !== 'cash_register' && type !== 'airhorn' && type !== 'camera_shutter') return;

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
      
      // Enhanced sound palette for telesales actions
      switch (type) {
        case 'success':
          oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C note
          oscillator.type = 'sine';
          gainNode.gain.setValueAtTime(0.06, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.3);
          break;
          
        case 'camera_shutter': // Upload proof sound - camera shutter + soft chime
          // Create double-tone for camera shutter effect
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // High click
          oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.05); // Lower click
          oscillator.type = 'square';
          gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
          
          // Add soft chime
          setTimeout(() => {
            try {
              const chimeOsc = audioContext.createOscillator();
              const chimeGain = audioContext.createGain();
              chimeOsc.connect(chimeGain);
              chimeGain.connect(audioContext.destination);
              
              chimeOsc.frequency.setValueAtTime(659, audioContext.currentTime + 0.15); // E note
              chimeOsc.type = 'sine';
              chimeGain.gain.setValueAtTime(0.04, audioContext.currentTime + 0.15);
              chimeGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
              chimeOsc.start(audioContext.currentTime + 0.15);
              chimeOsc.stop(audioContext.currentTime + 0.6);
            } catch (e) {
              // Ignore errors
            }
          }, 150);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.1);
          break;
          
        case 'cash_register': // Payment confirmed - "cha-ching" sound
          oscillator.frequency.setValueAtTime(659, audioContext.currentTime); // E note
          oscillator.frequency.exponentialRampToValueAtTime(523, audioContext.currentTime + 0.1); // Down to C
          oscillator.frequency.exponentialRampToValueAtTime(784, audioContext.currentTime + 0.2); // Up to G
          oscillator.type = 'triangle';
          gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.5);
          break;
          
        case 'celebration': // Delivery confirmed - "Delivered!" bell
          // Create bell-like tone with harmonics
          oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // High A
          oscillator.type = 'sine';
          gainNode.gain.setValueAtTime(0.07, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
          
          // Add bell harmonics
          setTimeout(() => {
            try {
              const harmonic = audioContext.createOscillator();
              const harmonicGain = audioContext.createGain();
              harmonic.connect(harmonicGain);
              harmonicGain.connect(audioContext.destination);
              
              harmonic.frequency.setValueAtTime(1320, audioContext.currentTime + 0.1); // Higher harmonic
              harmonic.type = 'sine';
              harmonicGain.gain.setValueAtTime(0.03, audioContext.currentTime + 0.1);
              harmonicGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
              harmonic.start(audioContext.currentTime + 0.1);
              harmonic.stop(audioContext.currentTime + 0.6);
            } catch (e) {
              // Ignore errors
            }
          }, 100);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.8);
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
          
        case 'whoosh': // DA assignment sound - swoosh effect
          oscillator.frequency.setValueAtTime(200, audioContext.currentTime); // Low start
          oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.3); // Sweep up
          oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.6); // Sweep down
          oscillator.type = 'sine';
          gainNode.gain.setValueAtTime(0.06, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.03, audioContext.currentTime + 0.3);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.6);
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
