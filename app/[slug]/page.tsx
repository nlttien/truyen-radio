"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Search,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  Share2,
  Download,
  ChevronRight,
  Star,
  Eye,
  User,
  Tag,
  BarChart3,
  Clock,
} from "lucide-react"

export default function AudiobookDetailPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  // const [currentTime, setCurrentTime] = useState(0)
  // const [duration] = useState(19269) // 5:21:09 in seconds
  // const [volume, setVolume] = useState(0.7)
  // const [playbackSpeed, setPlaybackSpeed] = useState(0.9)

  // const formatTime = (seconds: number) => {
  //   const hours = Math.floor(seconds / 3600)
  //   const minutes = Math.floor((seconds % 3600) / 60)
  //   const secs = seconds % 60
  //   if (hours > 0) {
  //     return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  //   }
  //   return `${minutes}:${secs.toString().padStart(2, "0")}`
  // }

  const chapters = ["Tập 001", "Tập 002", "Tập 003", "Tập 004", "Tập 005", "Tập 006"]

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

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Trang chủ</span>
          <ChevronRight className="w-4 h-4" />
          <span>Kỳ huyễn</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Ta Dũng Thần Thông Có Kỹ Thuật</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        {/* Main Content */}
        <Card className="bg-card border-border p-6 mb-6">
          <div className="flex gap-6">
            {/* Book Cover */}
            <div className="flex-shrink-0">
              <div className="w-64 h-80 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-center px-4">Ta Dũng Thần Thông</span>
              </div>
            </div>

            {/* Book Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-3">Ta Dũng Thần Thông Có Kỹ Thuật Audio</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  {[4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-muted-foreground" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">2.7/5 - (4 Vote)</span>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Tác giả:</span>
                  <span className="text-sm text-blue-500 dark:text-blue-400">Thương Thiên Bạch Hạc</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Thể loại:</span>
                  <span className="text-sm text-blue-500 dark:text-blue-400">Cổ Tử Kỳ huyễn</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Loại:</span>
                  <span className="text-sm">Truyện convert</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Trạng thái:</span>
                  <span className="text-sm text-green-500 dark:text-green-400">Hoàn thành</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Lượt nghe:</span>
                  <span className="text-sm">917</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Tử Ngư đã lấy được một cái thần thông, rất bình thường. Pháp Tướng thần thông, những hàn hiện, biến lớn
                nhỏ tùy ý tâm do đã có vô hạn khả năng. Ta có kỹ thuật, kỹ thuật sử dụng thần thông.
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <Play className="w-4 h-4 mr-2" />
                  Nghe từ đầu
                </Button>
                <Button variant="outline" className="border-border hover:bg-muted/50 bg-transparent">
                  <Heart className="w-4 h-4 mr-2" />
                  Yêu thích
                </Button>
                <Button variant="outline" className="border-border hover:bg-muted/50 bg-transparent">
                  <Share2 className="w-4 h-4 mr-2" />
                  Chia sẻ
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Audio Player */}
        <Card className="bg-card border-border p-4 mb-6">
          {/* Progress Bar */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm text-muted-foreground w-12">0:00:00</span>
            <div className="flex-1 bg-muted h-1 rounded-full">
              <div className="bg-blue-500 h-1 rounded-full" style={{ width: "0%" }}></div>
            </div>
            <span className="text-sm text-muted-foreground w-12">5:21:09</span>
          </div>

          {/* Player Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Volume2 className="w-5 h-5 text-muted-foreground" />
              <div className="w-20 bg-muted h-1 rounded-full">
                <div className="bg-blue-500 h-1 rounded-full" style={{ width: "70%" }}></div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <SkipBack className="w-6 h-6 text-muted-foreground cursor-pointer hover:text-foreground" />
              <SkipBack className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground" />
              <Button
                size="lg"
                className="rounded-full bg-blue-600 hover:bg-blue-700 w-12 h-12"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </Button>
              <SkipForward className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground" />
              <SkipForward className="w-6 h-6 text-muted-foreground cursor-pointer hover:text-foreground" />
            </div>

            <div className="flex items-center gap-4">
              <div className="w-20 bg-muted h-1 rounded-full">
                <div className="bg-blue-500 h-1 rounded-full" style={{ width: "90%" }}></div>
              </div>
              <span className="text-sm text-muted-foreground">0.9x</span>
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center justify-center mt-4">
            <span className="text-sm text-muted-foreground">00:00:00</span>
          </div>
        </Card>

        {/* Server and Chapter Selection */}
        <Card className="bg-card border-border p-4 mb-6">
          {/* Server Tabs */}
          <div className="flex gap-2 mb-4">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Server 1
            </Button>
            <Button size="sm" variant="outline" className="border-border hover:bg-muted/50 bg-transparent">
              SV2-Vip
            </Button>
            <Button size="sm" variant="outline" className="border-border hover:bg-muted/50 bg-transparent">
              SV-Vip
            </Button>
            <Button size="sm" variant="outline" className="border-border hover:bg-muted/50 bg-transparent">
              Nhạc nền 🎵
            </Button>
          </div>

          {/* Quality Selection */}
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-purple-600 text-white">SV-VIP</Badge>
            <span className="text-sm text-muted-foreground">Không giật, lag &gt;</span>
            <span className="text-sm text-blue-500 dark:text-blue-400">Nghe thử</span>
          </div>

          {/* Chapter List */}
          <div className="space-y-2">
            {chapters.map((chapter, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted rounded hover:bg-muted/70 cursor-pointer"
              >
                <span className="text-sm">
                  {index + 1}: {chapter}
                </span>
                <Download className="w-4 h-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <Card className="bg-card border-border p-4 mb-6">
          <div className="flex gap-3 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700">📖 Đọc truyện chữ</Button>
            <Button className="bg-orange-600 hover:bg-orange-700">🎧 Đọc truyện tranh</Button>
            <Button className="bg-green-600 hover:bg-green-700">📝 Review truyện, phim</Button>
            <Button className="bg-teal-600 hover:bg-teal-700">📚 Đọc Sách</Button>
          </div>

          <p className="text-sm text-muted-foreground text-center mt-4">
            Truyện Ta Dũng Thần Thông Có Kỹ Thuật Audio thuộc thể loại Cổ Tử, Kỳ huyễn của tác giả Thương Thiên Bạch
            Hạc. Truyện được lấy nguồn từ Truyện convert và Hoàn thành với số tập là 10.
          </p>
        </Card>

        {/* Author Info */}
        <Card className="bg-card border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">Trước</span>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">TRƯỚC ĐÓ</div>
                <div className="font-semibold">Trường Sinh Gia Tộc</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div>
                <div className="text-sm text-muted-foreground text-right">TIẾP THEO</div>
                <div className="font-semibold">Tự Tiến: Tự Học Được</div>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">Sau</Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">Copyrights © 2025 truyenradio.com, All rights reserved.</p>
          <p className="text-sm text-muted-foreground">Liên hệ quảng cáo: example.contact@email.com</p>
        </div>
      </footer>
    </div>
  )
}
