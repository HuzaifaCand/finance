import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar/Sidebar"; // Make sure path is correct
import MobileDrawer from "@/components/sidebar/MobileDrawer";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Finance Tracker",
  description: "Optimized and Extremely efficient finance tracker",
  icons: {
    icon: "/logo.svg",
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
        <main className="min-h-screen bg-background flex gap-5">
          <Sidebar />
          <MobileDrawer />

          {/* Main content area */}
          <div className="flex-1 min-h-screen">
            <Navbar />
            <div className="p-4">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
