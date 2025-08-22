'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/LoginForm';
import Header from '@/components/Header';
import StoryLibrary from '@/components/StoryLibrary';
import StoryPlayer from '@/components/StoryPlayer';
import { Story } from '@/lib/stories';

export default function Home() {
  const { user, isLoading } = useAuth();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  // Show loading spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!user) {
    return <LoginForm />;
  }

  // Main application
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        <StoryLibrary onSelectStory={setSelectedStory} />
      </main>

      {/* Story Player Modal */}
      {selectedStory && (
        <StoryPlayer
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </div>
  );
}
