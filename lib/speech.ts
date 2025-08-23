export interface SpeechSettings {
  voice?: SpeechSynthesisVoice | null;
  rate: number; // 0.1 to 10
  pitch: number; // 0 to 2  
  volume: number; // 0 to 1
}

export interface SpeechProgress {
  currentPosition: number;
  totalLength: number;
  percentage: number;
  currentWord?: string;
}

export class TextToSpeechService {
  private synth: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance | null = null;
  private isPlaying = false;
  private isPaused = false;
  private currentText = '';
  private currentPosition = 0;
  private settings: SpeechSettings = {
    rate: 1,
    pitch: 1,
    volume: 1
  };
  
  // Event callbacks
  private onPlayCallback?: () => void;
  private onPauseCallback?: () => void;
  private onStopCallback?: () => void;
  private onEndCallback?: () => void;
  private onProgressCallback?: (progress: SpeechProgress) => void;
  private onErrorCallback?: (error: string) => void;

  constructor() {
    if (typeof window !== 'undefined') {
      this.synth = window.speechSynthesis;
    } else {
      // Fallback for server-side rendering
      this.synth = {} as SpeechSynthesis;
    }
  }

  // Get available voices
  getVoices(): SpeechSynthesisVoice[] {
    if (!this.synth.getVoices) return [];
    return this.synth.getVoices().filter(voice => 
      voice.lang.startsWith('vi') || voice.lang.startsWith('en')
    );
  }

  // Load voices (needed for some browsers)
  loadVoices(): Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve) => {
      if (this.synth.getVoices().length > 0) {
        resolve(this.getVoices());
        return;
      }

      const onVoicesChanged = () => {
        this.synth.removeEventListener('voiceschanged', onVoicesChanged);
        resolve(this.getVoices());
      };

      this.synth.addEventListener('voiceschanged', onVoicesChanged);
    });
  }

  // Set speech settings
  setSettings(settings: Partial<SpeechSettings>): void {
    this.settings = { ...this.settings, ...settings };
  }

  // Get current settings
  getSettings(): SpeechSettings {
    return { ...this.settings };
  }

  // Play text from a specific position
  play(text: string, startPosition = 0): void {
    if (!this.synth) {
      this.onErrorCallback?.('Speech synthesis not supported');
      return;
    }

    this.stop(); // Stop any current speech
    
    this.currentText = text;
    this.currentPosition = startPosition;
    
    // Get text from start position
    const textToSpeak = text.substring(startPosition);
    
    this.utterance = new SpeechSynthesisUtterance(textToSpeak);
    this.utterance.voice = this.settings.voice || null;
    this.utterance.rate = this.settings.rate;
    this.utterance.pitch = this.settings.pitch;
    this.utterance.volume = this.settings.volume;

    // Event handlers
    this.utterance.onstart = () => {
      this.isPlaying = true;
      this.isPaused = false;
      this.onPlayCallback?.();
    };

    this.utterance.onpause = () => {
      this.isPaused = true;
      this.onPauseCallback?.();
    };

    this.utterance.onresume = () => {
      this.isPaused = false;
      this.onPlayCallback?.();
    };

    this.utterance.onend = () => {
      this.isPlaying = false;
      this.isPaused = false;
      this.currentPosition = this.currentText.length;
      this.onEndCallback?.();
    };

    this.utterance.onerror = (event) => {
      this.isPlaying = false;
      this.isPaused = false;
      this.onErrorCallback?.(`Speech error: ${event.error}`);
    };

    // Progress tracking (approximate)
    this.utterance.onboundary = (event) => {
      if (event.name === 'word') {
        this.currentPosition = startPosition + event.charIndex;
        this.onProgressCallback?.({
          currentPosition: this.currentPosition,
          totalLength: this.currentText.length,
          percentage: (this.currentPosition / this.currentText.length) * 100,
          currentWord: this.getCurrentWord()
        });
      }
    };

    this.synth.speak(this.utterance);
  }

  // Pause speech
  pause(): void {
    if (this.synth && this.isPlaying && !this.isPaused) {
      this.synth.pause();
    }
  }

  // Resume speech
  resume(): void {
    if (this.synth && this.isPlaying && this.isPaused) {
      this.synth.resume();
    }
  }

  // Stop speech
  stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.isPlaying = false;
      this.isPaused = false;
      this.onStopCallback?.();
    }
  }

  // Get current word being spoken
  private getCurrentWord(): string {
    const words = this.currentText.split(/\s+/);
    let position = 0;
    
    for (const word of words) {
      if (position <= this.currentPosition && this.currentPosition <= position + word.length) {
        return word;
      }
      position += word.length + 1; // +1 for space
    }
    
    return '';
  }

  // Check if currently playing
  isCurrentlyPlaying(): boolean {
    return this.isPlaying && !this.isPaused;
  }

  // Check if paused
  isCurrentlyPaused(): boolean {
    return this.isPaused;
  }

  // Get current position
  getCurrentPosition(): number {
    return this.currentPosition;
  }

  // Get current progress
  getCurrentProgress(): SpeechProgress {
    return {
      currentPosition: this.currentPosition,
      totalLength: this.currentText.length,
      percentage: this.currentText.length > 0 ? (this.currentPosition / this.currentText.length) * 100 : 0,
      currentWord: this.getCurrentWord()
    };
  }

  // Event listeners
  onPlay(callback: () => void): void {
    this.onPlayCallback = callback;
  }

  onPause(callback: () => void): void {
    this.onPauseCallback = callback;
  }

  onStop(callback: () => void): void {
    this.onStopCallback = callback;
  }

  onEnd(callback: () => void): void {
    this.onEndCallback = callback;
  }

  onProgress(callback: (progress: SpeechProgress) => void): void {
    this.onProgressCallback = callback;
  }

  onError(callback: (error: string) => void): void {
    this.onErrorCallback = callback;
  }

  // Cleanup
  destroy(): void {
    this.stop();
    this.onPlayCallback = undefined;
    this.onPauseCallback = undefined;
    this.onStopCallback = undefined;
    this.onEndCallback = undefined;
    this.onProgressCallback = undefined;
    this.onErrorCallback = undefined;
  }
}
