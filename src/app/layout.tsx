import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Enchanting Holidays | Premium Spiritual & Cultural Travel in India",
  description: "Experience the spiritual heart of India. We offer premium, customized tour packages to Varanasi (Kashi), Ayodhya, Prayagraj, and Bodhgaya with 15+ years of trusted travel expertise.",
  keywords: ["Varanasi Tour", "Kashi Tour", "Banaras Tour", "Ayodhya Tour", "Prayagraj Tour", "Buddhist Circuit Packages", "Spiritual Tours India"],
  authors: [{ name: "The Enchanting Holidays" }],
  openGraph: {
    title: "The Enchanting Holidays | Premium Spiritual & Cultural Travel",
    description: "Experience the spiritual heart of India. We offer premium, customized tour packages to Varanasi (Kashi), Ayodhya, Prayagraj, and Bodhgaya.",
    url: "https://theenchantingholidays.com",
    siteName: "The Enchanting Holidays",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
