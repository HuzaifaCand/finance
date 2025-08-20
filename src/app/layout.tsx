import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { Toaster } from "sonner";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "FinanceHK",
  description: "Optimized Expense Tracker made for students in Hong Kong",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "FinanceHK",
    description: "Optimized Expense Tracker made for students in Hong Kong",
    url: "https://financehk.vercel.app",
    siteName: "FinanceHK",
    images: [
      {
        url: "/icons/icon-192.png",
        width: 1200,
        height: 630,
        alt: "FinanceHK App",
      },
    ],
    locale: "en_HK",
    type: "website",
  },
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
