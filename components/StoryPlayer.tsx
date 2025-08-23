'use client';

import { useEffect, useState } from 'react';
import { useSpeech } from '@/contexts/SpeechContext';
import { useAuth } from '@/contexts/AuthContext';
import { Story, saveUserProgress } from '@/lib/stories';

interface StoryPlayerProps {
  story: Story;
  onClose: () => void;
}

export default function StoryPlayer({ story, onClose }: StoryPlayerProps) {
  const { user } = useAuth();
  const {
    playStory,
    pause,
    resume,
    stop,
    isPlaying,
    isPaused,
    progress,
    settings,
    updateSettings,
    voices
  } = useSpeech();

  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Auto-play story when component mounts
    playStory(story, 0);

    return () => {
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [story]);

  // Save progress periodically
  useEffect(() => {
    if (user && progress.currentPosition > 0) {
      const progressData = {
        storyId: story.id,
        position: progress.currentPosition,
        percentage: progress.percentage,
        lastReadAt: new Date().toISOString()
      };
      
      // Debounce saving progress
      const timeoutId = setTimeout(() => {
        saveUserProgress(user.id, progressData);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [progress, story.id, user]);

  const handlePlayPause = () => {
    if (isPlaying && !isPaused) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      playStory(story, progress.currentPosition);
    }
  };

  const handleStop = () => {
    stop();
  };

  const handleSpeedChange = (newRate: number) => {
    updateSettings({ rate: newRate });
  };

  const handleVolumeChange = (newVolume: number) => {
    updateSettings({ volume: newVolume });
  };

  const handleVoiceChange = (voiceIndex: number) => {
    const selectedVoice = voices[voiceIndex] || null;
    updateSettings({ voice: selectedVoice });
  };

  const formatTime = (position: number, total: number) => {
    const wordsPerMinute = 200;
    const currentMinutes = Math.floor((position / 5) / wordsPerMinute);
    const totalMinutes = Math.floor((total / 5) / wordsPerMinute);
    return `${currentMinutes}:${(currentMinutes % 60).toString().padStart(2, '0')} / ${totalMinutes}:${(totalMinutes % 60).toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{story.title}</h2>
            <p className="text-gray-600">Tác giả: {story.author}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex h-96">
          {/* Story Text */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="prose max-w-none">
              {story.content.split('').map((char, index) => (
                <span
                  key={index}
                  className={
                    index <= progress.currentPosition
                      ? 'bg-yellow-200'
                      : index === progress.currentPosition
                      ? 'bg-yellow-400'
                      : ''
                  }
                >
                  {char}
                </span>
              ))}
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="w-80 p-6 border-l bg-gray-50">
              <h3 className="text-lg font-semibold mb-4">Cài đặt âm thanh</h3>
              
              {/* Voice Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Giọng đọc</label>
                <select
                  value={voices.findIndex(v => v === settings.voice)}
                  onChange={(e) => handleVoiceChange(parseInt(e.target.value))}
                  className="w-full p-2 border rounded-md"
                >
                  {voices.map((voice, index) => (
                    <option key={index} value={index}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>

              {/* Speed Control */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Tốc độ: {settings.rate}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={settings.rate}
                  onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Volume Control */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Âm lượng: {Math.round(settings.volume * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Pitch Control */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Cao độ: {settings.pitch}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={settings.pitch}
                  onChange={(e) => updateSettings({ pitch: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-6 border-t bg-gray-50">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Tiến độ: {Math.round(progress.percentage)}%</span>
              <span>{formatTime(progress.currentPosition, story.content.length)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${progress.percentage}%` }}
              ></div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={handleStop}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              title="Dừng"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
              </svg>
            </button>

            <button
              onClick={handlePlayPause}
              className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white"
              title={isPlaying && !isPaused ? 'Tạm dừng' : 'Phát'}
            >
              {isPlaying && !isPaused ? (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              title="Cài đặt"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Current Word */}
          {progress.currentWord && (
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">Đang đọc: </span>
              <span className="font-semibold text-indigo-600">{progress.currentWord}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
