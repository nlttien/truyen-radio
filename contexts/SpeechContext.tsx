'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { TextToSpeechService, SpeechSettings, SpeechProgress } from '@/lib/speech';
import { Story } from '@/lib/stories';

interface SpeechContextType {
  service: TextToSpeechService;
  currentStory: Story | null;
  isPlaying: boolean;
  isPaused: boolean;
  progress: SpeechProgress;
  settings: SpeechSettings;
  voices: SpeechSynthesisVoice[];
  playStory: (story: Story, position?: number) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  updateSettings: (settings: Partial<SpeechSettings>) => void;
  loadVoices: () => Promise<void>;
}

const SpeechContext = createContext<SpeechContextType | undefined>(undefined);

export function SpeechProvider({ children }: { children: React.ReactNode }) {
  const [service] = useState(() => new TextToSpeechService());
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState<SpeechProgress>({
    currentPosition: 0,
    totalLength: 0,
    percentage: 0
  });
  const [settings, setSettings] = useState<SpeechSettings>({
    rate: 1,
    pitch: 1,
    volume: 1
  });
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Initialize service event listeners
  useEffect(() => {
    service.onPlay(() => {
      setIsPlaying(true);
      setIsPaused(false);
    });

    service.onPause(() => {
      setIsPaused(true);
    });

    service.onStop(() => {
      setIsPlaying(false);
      setIsPaused(false);
    });

    service.onEnd(() => {
      setIsPlaying(false);
      setIsPaused(false);
    });

    service.onProgress((progressData) => {
      setProgress(progressData);
    });

    service.onError((error) => {
      console.error('Speech error:', error);
      setIsPlaying(false);
      setIsPaused(false);
    });

    // Load saved settings
    const savedSettings = localStorage.getItem('speech-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
        service.setSettings(parsed);
      } catch (error) {
        console.error('Failed to load speech settings:', error);
      }
    }

    return () => {
      service.destroy();
    };
  }, [service]);

  const loadVoices = async () => {
    try {
      const availableVoices = await service.loadVoices();
      setVoices(availableVoices);
    } catch (error) {
      console.error('Failed to load voices:', error);
    }
  };

  // Load voices on mount
  useEffect(() => {
    loadVoices();
  }, []);

  const playStory = (story: Story, position = 0) => {
    setCurrentStory(story);
    service.play(story.content, position);
  };

  const pause = () => {
    service.pause();
  };

  const resume = () => {
    service.resume();
  };

  const stop = () => {
    service.stop();
    setCurrentStory(null);
  };

  const updateSettings = (newSettings: Partial<SpeechSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    service.setSettings(updatedSettings);
    
    // Save to localStorage
    localStorage.setItem('speech-settings', JSON.stringify(updatedSettings));
  };

  return (
    <SpeechContext.Provider
      value={{
        service,
        currentStory,
        isPlaying,
        isPaused,
        progress,
        settings,
        voices,
        playStory,
        pause,
        resume,
        stop,
        updateSettings,
        loadVoices,
      }}
    >
      {children}
    </SpeechContext.Provider>
  );
}

export function useSpeech() {
  const context = useContext(SpeechContext);
  if (context === undefined) {
    throw new Error('useSpeech must be used within a SpeechProvider');
  }
  return context;
}