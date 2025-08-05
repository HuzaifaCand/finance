import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/sidebar/Sidebar";
import MobileDrawer from "@/components/sidebar/MobileDrawer";
import { Toaster } from "sonner";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Optimized and Extremely efficient expense tracker",
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
        <main className="min-h-screen bg-background">
          <MobileDrawer />
          <section className="flex gap-4">
            <div className="hidden lg:flex">
              <Sidebar />
            </div>

            <div className="flex-1 min-h-screen overflow-x-hidden">
              <div className="p-4">{children}</div>
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
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
