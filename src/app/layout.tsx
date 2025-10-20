import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { Toaster } from "sonner";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FinanceHK",
  description: "Optimized Expense Tracker made for students in Hong Kong",

  icons: {
    icon: "/logo.svg", // Standard favicon
    shortcut: "/favicon.ico", // For older browsers
    apple: "/apple-touch-icon.png", // iOS devices
  },

  openGraph: {
    title: "FinanceHK",
    description: "Optimized Expense Tracker made for students in Hong Kong",
    url: "https://financehk.vercel.app",
    siteName: "FinanceHK",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "FinanceHK App",
      },
    ],
    locale: "en_HK",
    type: "website",
  },

  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <main className="min-h-screen bg-background">
          <Toaster
            toastOptions={{
              style: {
                backgroundColor: "#122628",
                color: "#e6f4ff",
                borderColor: "#122628",
              },
            }}
            position="top-center"
          />
          <AuthProvider>{children}</AuthProvider>
        </main>
      </body>
    </html>
  );
}
