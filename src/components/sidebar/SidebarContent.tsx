import { AnimatePresence, motion } from "framer-motion";
import Content from "./Content";

interface SidebarContentProps {
  isOpen: boolean;
}

export default function SidebarContent({ isOpen }: SidebarContentProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="sidebar"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.15 }}
          className="hidden lg:block"
        >
          <aside className="bg-background w-[200px] sticky top-0 h-screen hidden lg:flex flex-col justify-between pl-8 pt-4 overflow-y-auto">
            <Content />
          </aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
