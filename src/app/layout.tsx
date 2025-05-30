import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "M . Attique - Creative UI/UX & Software Developer",
  description: "Portfolio website of M . Attique - Creative UI/UX & Software Developer",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.className} antialiased text-gray-800 overflow-x-hidden`}>
        <main className="min-h-screen w-full">
          {children}
        </main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
