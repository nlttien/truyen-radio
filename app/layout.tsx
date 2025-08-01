import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import { SpeechProvider } from '@/contexts/SpeechContext';

export const metadata: Metadata = {
  title: "Truyện Radio - Nghe Truyện Online",
  description: "Ứng dụng nghe truyện online sử dụng Web Speech API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">
        <AuthProvider>
          <SpeechProvider>
            {children}
          </SpeechProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
