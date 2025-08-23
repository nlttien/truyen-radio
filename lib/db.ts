import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

const sql = neon(process.env.DATABASE_URL)

export interface Category {
  id: string
  name: string
  description: string
  color: string
  book_count: number
  created_at: string
  updated_at: string
}

export interface Book {
  id: string
  title: string
  author: string
  description: string
  category_id: string
  rating: number
  vote_count: number
  views: number
  status: string
  chapter_count: number
  duration: string
  featured: boolean
  cover_image: string
  slug: string
  created_at: string
  updated_at: string
}

export interface Chapter {
  id: string
  book_id: string
  title: string
  chapter_number: number
  audio_url: string
  duration: string
  created_at: string
}

// Get all categories with book counts
export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await sql`
      SELECT * FROM categories 
      ORDER BY book_count DESC
    `
    return categories as Category[]
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

// Get featured books
export async function getFeaturedBooks(): Promise<Book[]> {
  try {
    const books = await sql`
      SELECT * FROM books 
      WHERE featured = true 
      ORDER BY views DESC 
      LIMIT 6
    `
    return books as Book[]
  } catch (error) {
    console.error("Error fetching featured books:", error)
    return []
  }
}

// Get trending books (high views, recent)
export async function getTrendingBooks(): Promise<Book[]> {
  try {
    const books = await sql`
      SELECT * FROM books 
      ORDER BY views DESC, created_at DESC 
      LIMIT 4
    `
    return books as Book[]
  } catch (error) {
    console.error("Error fetching trending books:", error)
    return []
  }
}

// Get book by slug
export async function getBookBySlug(slug: string): Promise<Book | null> {
  try {
    const books = await sql`
      SELECT * FROM books 
      WHERE slug = ${slug}
      LIMIT 1
    `
    return (books[0] as Book) || null
  } catch (error) {
    console.error("Error fetching book by slug:", error)
    return null
  }
}

// Get books by category
export async function getBooksByCategory(categoryId: string, limit = 10): Promise<Book[]> {
  try {
    const books = await sql`
      SELECT * FROM books 
      WHERE category_id = ${categoryId}
      ORDER BY views DESC 
      LIMIT ${limit}
    `
    return books as Book[]
  } catch (error) {
    console.error("Error fetching books by category:", error)
    return []
  }
}

// Get chapters for a book
export async function getChaptersByBookId(bookId: string): Promise<Chapter[]> {
  try {
    const chapters = await sql`
      SELECT * FROM chapters 
      WHERE book_id = ${bookId}
      ORDER BY chapter_number ASC
    `
    return chapters as Chapter[]
  } catch (error) {
    console.error("Error fetching chapters:", error)
    return []
  }
}
