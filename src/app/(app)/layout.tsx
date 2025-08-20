import Sidebar from "@/components/sidebar/Sidebar";
import MobileDrawer from "@/components/sidebar/MobileDrawer";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <MobileDrawer />
      <section className="flex gap-4">
        <div className="hidden lg:flex">
          <Sidebar />
        </div>

        <div className="flex-1 min-h-screen overflow-x-hidden">
          <div className="p-4">{children}</div>
        </div>
      </section>
    </section>
  );
}
