"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Search, Play, Star, Eye, Clock, BookOpen, ChevronRight, Flame } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const featuredBooks = [
    {
      id: "ta-dung-than-thong-co-ky-thuat",
      title: "Ta Dũng Thần Thông Có Kỹ Thuật",
      author: "Thương Thiên Bạch Hạc",
      category: "Kỳ huyễn",
      rating: 2.7,
      views: 917,
      status: "Hoàn thành",
      chapters: 10,
    },
    {
      id: "truong-sinh-gia-toc",
      title: "Trường Sinh Gia Tộc",
      author: "Tác giả khác",
      category: "Tiên hiệp",
      rating: 4.2,
      views: 1523,
      status: "Đang cập nhật",
      chapters: 45,
    },
    {
      id: "tu-tien-tu-hoc-duoc",
      title: "Tự Tiến: Tự Học Được",
      author: "Tác giả mới",
      category: "Đô thị",
      rating: 3.8,
      views: 892,
      status: "Hoàn thành",
      chapters: 23,
    },
  ]

  const trendingBooks = [
    {
      id: "trending-1",
      title: "Đế Bá Thiên Hạ",
      author: "Mộng Nhập Thần Cơ",
      category: "Kỳ huyễn",
      rating: 4.5,
      views: 2341,
      isNew: true,
    },
    {
      id: "trending-2",
      title: "Vạn Cổ Thần Đế",
      author: "Phi Thiên Ngư",
      category: "Tiên hiệp",
      rating: 4.3,
      views: 1876,
      isHot: true,
    },
  ]

  const categories = [
    { name: "Kỳ huyễn", count: 245, color: "bg-blue-600" },
    { name: "Tiên hiệp", count: 189, color: "bg-purple-600" },
    { name: "Đô thị", count: 156, color: "bg-green-600" },
    { name: "Lịch sử", count: 98, color: "bg-orange-600" },
    { name: "Khoa huyễn", count: 87, color: "bg-red-600" },
    { name: "Võ hiệp", count: 76, color: "bg-teal-600" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-xl font-bold text-blue-500 dark:text-blue-400">TRUYENRADIO</h1>
              <div className="relative">
                <Input
                  placeholder="Tìm kiếm tên truyện..."
                  className="w-80 bg-muted border-border text-foreground placeholder:text-muted-foreground"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">Thể Loại</span>
              <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">Truyện Full</span>
              <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">Gửi Truyện</span>
              <Badge className="bg-yellow-500 text-black font-semibold hover:bg-yellow-400">VIP</Badge>
              <ThemeToggle />
              <div className="w-8 h-8 bg-muted rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200 dark:border-blue-800 p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                Trending Hôm Nay
              </h2>
              <p className="text-muted-foreground">Khám phá những truyện audio hot nhất được cộng đồng yêu thích</p>
            </div>
            <Button
              variant="outline"
              className="border-blue-500 text-blue-500 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950 bg-transparent"
            >
              Xem tất cả <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </Card>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500 dark:text-orange-400" />
              Đang Thịnh Hành
            </h2>
            <Link
              href="/trending"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm flex items-center gap-1"
            >
              Xem thêm <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {trendingBooks.map((book, index) => (
              <Link key={index} href={`/${book.id}`}>
                <Card className="bg-card border-border p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex gap-3">
                    <div className="w-16 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-base line-clamp-1">{book.title}</h3>
                        {book.isNew && <Badge className="bg-green-600 text-white text-xs">Mới</Badge>}
                        {book.isHot && <Badge className="bg-red-600 text-white text-xs">Hot</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>{book.rating}</span>
                          </div>
                          <Badge
                            variant="outline"
                            className="border-blue-500 text-blue-500 dark:border-blue-400 dark:text-blue-400 text-xs"
                          >
                            {book.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Eye className="w-3 h-3" />
                          <span>{book.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              Thể Loại
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="h-8 px-3 border-border hover:bg-muted/50 cursor-pointer transition-colors bg-transparent"
              >
                <div className={`w-2 h-2 ${category.color} rounded-full mr-2`}></div>
                <span className="text-sm font-medium">{category.name}</span>
                <span className="text-xs text-muted-foreground ml-1">({category.count})</span>
              </Button>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
              Truyện Nổi Bật
            </h2>
            <Link
              href="/featured"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm flex items-center gap-1"
            >
              Xem thêm <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredBooks.map((book, index) => (
              <Link key={index} href={`/${book.id}`}>
                <Card className="bg-card border-border p-4 hover:bg-muted/50 cursor-pointer transition-colors h-full flex flex-col">
                  <div className="flex gap-3 mb-3">
                    <div className="w-16 h-22 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base mb-1 line-clamp-2">{book.title}</h3>
                      <p className="text-xs text-muted-foreground mb-1">Tác giả: {book.author}</p>
                      <Badge
                        variant="outline"
                        className="border-blue-500 text-blue-500 dark:border-blue-400 dark:text-blue-400 text-xs"
                      >
                        {book.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{book.rating}/5</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Eye className="w-3 h-3" />
                        <span>{book.views}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{book.status}</span>
                      </div>
                      <span className="text-muted-foreground">{book.chapters} tập</span>
                    </div>
                  </div>

                  <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm h-8">
                    <Play className="w-3 h-3 mr-2" />
                    Nghe ngay
                  </Button>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <Card className="bg-card border-border p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg mb-1">Khám phá thêm nội dung</h3>
                <p className="text-muted-foreground text-sm">Trải nghiệm đa dạng các loại hình giải trí</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                  📖 Truyện chữ
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                  🎧 Truyện tranh
                </Button>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                  📝 Review
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">Copyrights © 2025 truyenradio.com, All rights reserved.</p>
          <p className="text-sm text-muted-foreground">Liên hệ quảng cáo: example.contact@email.com</p>
        </div>
      </footer>
    </div>
  )
}
