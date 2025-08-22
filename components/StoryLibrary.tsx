'use client';

import { useState, useEffect } from 'react';
import { Story, getStories, getUserProgress } from '@/lib/stories';
import { useAuth } from '@/contexts/AuthContext';

interface StoryLibraryProps {
  onSelectStory: (story: Story) => void;
}

export default function StoryLibrary({ onSelectStory }: StoryLibraryProps) {
  const { user } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [userProgress, setUserProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    const allStories = getStories();
    setStories(allStories);
    setFilteredStories(allStories);

    // Load user progress
    if (user) {
      const progress = getUserProgress(user.id);
      const progressMap: Record<string, number> = {};
      progress.forEach(p => {
        progressMap[p.storyId] = p.percentage;
      });
      setUserProgress(progressMap);
    }
  }, [user]);

  // Filter stories based on search and category
  useEffect(() => {
    let filtered = stories;

    if (searchTerm) {
      filtered = filtered.filter(story =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(story => story.category === selectedCategory);
    }

    setFilteredStories(filtered);
  }, [stories, searchTerm, selectedCategory]);

  const categories = Array.from(new Set(stories.map(story => story.category)));

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} phút`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Thư viện truyện</h1>
        <p className="text-gray-600">Khám phá và nghe các câu chuyện hay</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Tìm kiếm truyện..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Tất cả thể loại</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story) => (
          <div
            key={story.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onSelectStory(story)}
          >
            {/* Story Image Placeholder */}
            <div className="h-48 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-t-lg flex items-center justify-center">
              <div className="text-white text-center">
                <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM5 8a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm0 3a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" />
                </svg>
                <p className="text-sm font-medium">{story.category}</p>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {story.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">Tác giả: {story.author}</p>
              <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                {story.description}
              </p>

              {/* Progress Bar */}
              {userProgress[story.id] > 0 && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Đã đọc</span>
                    <span>{Math.round(userProgress[story.id])}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-indigo-600 h-1.5 rounded-full"
                      style={{ width: `${userProgress[story.id]}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {story.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
                {story.tags.length > 3 && (
                  <span className="text-xs text-gray-500">+{story.tags.length - 3}</span>
                )}
              </div>

              {/* Reading Time */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{getReadingTime(story.content)}</span>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <span>Nghe ngay</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredStories.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.008-5.624-2.457M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy truyện</h3>
          <p className="text-gray-600">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
        </div>
      )}
    </div>
  );
}