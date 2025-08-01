'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useSpeech } from '@/contexts/SpeechContext';

export default function Header() {
  const { user, logout } = useAuth();
  const { currentStory, isPlaying, stop } = useSpeech();

  const handleLogout = () => {
    stop(); // Stop any playing audio
    logout();
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Truyện Radio</h1>
            </div>
          </div>

          {/* Currently Playing */}
          {currentStory && (
            <div className="flex-1 mx-8">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {currentStory.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      Tác giả: {currentStory.author}
                    </p>
                  </div>
                  <div className="ml-4 flex items-center">
                    {isPlaying && (
                      <div className="flex space-x-1">
                        <div className="w-1 h-4 bg-indigo-500 animate-pulse"></div>
                        <div className="w-1 h-4 bg-indigo-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1 h-4 bg-indigo-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    )}
                    <span className="ml-2 text-xs text-gray-500">
                      {isPlaying ? 'Đang phát' : 'Đã tạm dừng'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                Xin chào, {user?.username}
              </p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            
            <div className="relative">
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}