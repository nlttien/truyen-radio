export interface Story {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  content: string;
  duration?: number; // in minutes
  chapters?: Chapter[];
  imageUrl?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface UserProgress {
  storyId: string;
  chapterId?: string;
  position: number; // character position in content
  percentage: number;
  lastReadAt: string;
}

export interface Bookmark {
  id: string;
  storyId: string;
  chapterId?: string;
  position: number;
  note?: string;
  createdAt: string;
}

// Sample stories data
export const sampleStories: Story[] = [
  {
    id: '1',
    title: 'Cô Gái Bán Diêm',
    author: 'Hans Christian Andersen',
    category: 'Cổ tích',
    description: 'Câu chuyện cảm động về cô bé bán diêm trong đêm giao thừa lạnh giá.',
    content: `Trời rất lạnh, tuyết rơi và đã gần tối. Đó là đêm cuối cùng của năm - đêm giao thừa. Trong cái lạnh và bóng tối đó, một cô bé nghèo đi dọc các con phố với đầu trần và chân không. Đúng là khi rời khỏi nhà, em có đi giày, nhưng chúng quá lớn - đó là đôi giày mà mẹ em vừa mới đi - nên cô bé đã làm mất chúng khi chạy qua đường để tránh hai chiếc xe ngựa đang chạy rất nhanh.

Một chiếc giày không tìm thấy đâu, còn chiếc kia thì bị một cậu bé nào đó lấy chạy mất, nó nói sẽ dùng làm nôi cho con khi có vợ.

Vậy là cô bé đi chân trần, đôi chân nhỏ đỏ và tím tái vì lạnh. Trong tạp dề cũ, em mang theo nhiều hộp diêm, và trên tay còn cầm một hộp nữa. Ngày hôm nay không có ai mua của em cả, không ai cho em dù chỉ một đồng xu. Em đói và lạnh lắm, trông thật đáng thương! Những bông tuyết rơi lên mái tóc dài và vàng của em, những lọn tóc xoăn đẹp đẽ rũ xuống cổ, nhưng em chẳng nghĩ gì đến vẻ đẹp của mình cả.`,
    tags: ['cổ tích', 'cảm động', 'giáng sinh'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '2',
    title: 'Tấm Cám',
    author: 'Truyền thuyết dân gian Việt Nam',
    category: 'Truyện cổ tích Việt Nam',
    description: 'Câu chuyện cổ tích nổi tiếng về Tấm và Cám, bài học về lòng hiền lành và sự độc ác.',
    content: `Ngày xưa có một người đàn ông góa vợ, ông có một cô con gái tên là Tấm. Sau đó ông cưới vợ khác, người vợ này cũng có một con gái tên là Cám. Tấm rất hiền lành, chăm chỉ, còn Cám thì lười biếng và xấu tính.

Khi người cha mất, mẹ con Cám liền bắt Tấm làm mọi công việc nặng nhọc trong nhà. Tấm phải quét nhà, nấu cơm, giặt giũ, còn Cám thì chỉ việc ăn chơi.

Một hôm, mẹ con Cám bảo Tấm và Cám cùng đi bắt cá. Ai bắt được nhiều cá thì sẽ được thưởng áo mới. Tấm bắt được rất nhiều cá, trong đó có một con cá bống nhỏ rất đẹp. Tấm thương cá nên thả vào lu nước và cho ăn cơm mỗi ngày.

Cá lớn dần lên, rất thông minh và biết tiếng người. Mỗi khi Tấm gọi: "Cá ơi, cá ơi!" là cá liền nổi lên. Cám biết chuyện liền tìm cách giết cá để nấu ăn.`,
    tags: ['truyện cổ tích', 'việt nam', 'dân gian'],
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02'
  },
  {
    id: '3',
    title: 'Thỏ và Rùa',
    author: 'Aesop',
    category: 'Ngụ ngôn',
    description: 'Câu chuyện ngụ ngôn nổi tiếng về cuộc đua giữa thỏ và rùa, bài học về sự kiên trì.',
    content: `Ngày xưa, có một con thỏ rất nhanh nhẹn và một con rùa rất chậm chạp. Thỏ thường hay khoe khoang về tốc độ của mình và chế giễu rùa vì đi chậm.

"Này rùa, sao mày đi chậm thế? Tao có thể chạy nhanh hơn mày gấp trăm lần!" - Thỏ nói một cách kiêu hãnh.

Rùa không giận mà chỉ mỉm cười: "Thỏ ơi, đừng khoe khoang quá. Mình thách anh ta đua với mình từ đây đến gốc cây kia xem ai về đích trước."

Thỏ cười lớn: "Mày dám thách tao à? Được, tao chấp nhận!"

Cuộc đua bắt đầu. Thỏ chạy rất nhanh, chỉ trong chốc lát đã bỏ xa rùa một quãng đường dài. Thấy rùa còn bò rất xa phía sau, thỏ nghĩ: "Mình chạy nhanh quá, rùa chậm thế kia chắc phải lâu lắm mới đến được đây. Mình ngủ một giấc cho đỡ mệt, rồi hẳn chạy tiếp cũng kịp."

Thỏ nằm dưới gốc cây và ngủ say. Trong khi đó, rùa vẫn kiên trì bò từng bước một, không nghỉ ngơi. Khi thỏ thức giấc thì rùa đã về đích trước.`,
    tags: ['ngụ ngôn', 'bài học', 'kiên trì'],
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03'
  }
];

// Local storage helpers
const STORIES_KEY = 'truyen-radio-stories';
const PROGRESS_KEY = 'truyen-radio-progress';
const BOOKMARKS_KEY = 'truyen-radio-bookmarks';

export function getStories(): Story[] {
  if (typeof window === 'undefined') return sampleStories;
  
  const stored = localStorage.getItem(STORIES_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Initialize with sample data
  localStorage.setItem(STORIES_KEY, JSON.stringify(sampleStories));
  return sampleStories;
}

export function getStory(id: string): Story | null {
  const stories = getStories();
  return stories.find(story => story.id === id) || null;
}

export function getUserProgress(userId: string): UserProgress[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(`${PROGRESS_KEY}-${userId}`);
  return stored ? JSON.parse(stored) : [];
}

export function saveUserProgress(userId: string, progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  
  const allProgress = getUserProgress(userId);
  const existingIndex = allProgress.findIndex(p => p.storyId === progress.storyId);
  
  if (existingIndex >= 0) {
    allProgress[existingIndex] = progress;
  } else {
    allProgress.push(progress);
  }
  
  localStorage.setItem(`${PROGRESS_KEY}-${userId}`, JSON.stringify(allProgress));
}

export function getUserBookmarks(userId: string): Bookmark[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(`${BOOKMARKS_KEY}-${userId}`);
  return stored ? JSON.parse(stored) : [];
}

export function saveBookmark(userId: string, bookmark: Bookmark): void {
  if (typeof window === 'undefined') return;
  
  const bookmarks = getUserBookmarks(userId);
  bookmarks.push(bookmark);
  localStorage.setItem(`${BOOKMARKS_KEY}-${userId}`, JSON.stringify(bookmarks));
}

export function removeBookmark(userId: string, bookmarkId: string): void {
  if (typeof window === 'undefined') return;
  
  const bookmarks = getUserBookmarks(userId);
  const filtered = bookmarks.filter(b => b.id !== bookmarkId);
  localStorage.setItem(`${BOOKMARKS_KEY}-${userId}`, JSON.stringify(filtered));
}
