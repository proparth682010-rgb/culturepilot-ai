/**
 * Interactive Web Audio Ambient Sound Generator
 * Generates real-time ambient drones, tape warmth, and rain textures directly in the browser
 */

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private oscillators: OscillatorNode[] = [];
  private gainNode: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  public playPreset(preset: 'noir_drone' | 'tape_warmth' | 'meditation' | 'rain') {
    this.stop();
    this.initContext();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 2.5);
    masterGain.connect(this.ctx.destination);
    this.gainNode = masterGain;

    const frequencies = preset === 'noir_drone' 
      ? [55.0, 110.0, 164.81, 220.0] // Deep A minor chord with subtle fifths
      : preset === 'tape_warmth'
      ? [65.41, 130.81, 196.0, 261.63] // C major warm base
      : preset === 'meditation'
      ? [73.42, 146.83, 220.0, 293.66] // D contemplative modal
      : [50.0, 98.0, 147.0]; // Low rumble for rain

    this.oscillators = frequencies.map((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const oscGain = this.ctx!.createGain();
      
      // Warm sine / triangle wave combination
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq + (Math.random() * 0.4 - 0.2), this.ctx!.currentTime);

      // Low pass filter for analog warmth
      const filter = this.ctx!.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320 + idx * 80, this.ctx!.currentTime);

      oscGain.gain.setValueAtTime(0.25 / frequencies.length, this.ctx!.currentTime);
      
      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(masterGain);
      
      osc.start();
      return osc;
    });

    // Generate vinyl/rain pink-noise crackle texture
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.02; // Very quiet textured bed
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(preset === 'rain' ? 800 : 450, this.ctx.currentTime);
      noiseFilter.Q.setValueAtTime(1.2, this.ctx.currentTime);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);

      whiteNoise.start();
      this.noiseNode = whiteNoise;
    } catch (e) {
      // Noise buffer fallback
    }

    this.isPlaying = true;
  }

  public stop() {
    if (this.gainNode && this.ctx) {
      try {
        this.gainNode.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1.0);
        setTimeout(() => {
          this.oscillators.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch (err) {}
          });
          this.oscillators = [];
          if (this.noiseNode) {
            try { this.noiseNode.stop(); this.noiseNode.disconnect(); } catch (err) {}
            this.noiseNode = null;
          }
        }, 1100);
      } catch (err) {}
    }
    this.isPlaying = false;
  }

  public getStatus() {
    return this.isPlaying;
  }
}

export const ambientSound = new AmbientSoundEngine();
