"use client";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  onClose?: () => void;
}
export default function Content({ onClose }: Props) {
  const username = useAuthStore((state) => state.user?.username);

  const router = useRouter();

  async function handleSignOut() {
    try {
      onClose && onClose();
      await signOut(auth);
      // Optionally redirect to login page
      router.push("/login");
      toast.success("Signed out successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to sign out");
    }
  }

  return (
    <div className="space-y-6 pr-4 flex flex-col h-full">
      {/* Greeting */}
      <div className="mt-8">
        <h1 className="text-moreWhite pr-2 font-bold text-lg">
          Hey,{" "}
          {username
            ? username
                .split(" ")[0]
                .toLowerCase()
                .replace(/^./, (c) => c.toUpperCase())
            : ""}{" "}
          👋
        </h1>
        <p className="text-muted text-xs mt-1">Welcome!</p>
        <hr className="my-3 border-teal/30" />
      </div>

      {/* Navigation */}
      <div>
        <p className="text-xs uppercase tracking-wider text-muted/80 mb-2">
          Navigation
        </p>
        <div className="space-y-1 text-xs text-muted flex flex-col gap-1 font-medium">
          <Link
            onClick={onClose}
            href="/tracker"
            className="text-left hover:text-primary transition-colors"
          >
            Expense Tracker
          </Link>
          <Link
            onClick={onClose}
            href="/budgets"
            className="text-left hover:text-primary transition-colors"
          >
            Budget
          </Link>
          <Link
            onClick={onClose}
            href="/stats"
            className="text-left hover:text-primary transition-colors"
          >
            Stats
          </Link>
          <Link
            onClick={onClose}
            href="/categories"
            className="text-left hover:text-primary transition-colors"
          >
            Edit Categories
          </Link>
        </div>
      </div>

      {/* Info Section */}
      <div>
        <p className="text-xs uppercase tracking-wider text-muted mb-2">
          Help & Info
        </p>
        <div className="space-y-1 text-xs text-muted flex flex-col gap-1 font-medium">
          <Link
            onClick={onClose}
            href="/about"
            className="text-left hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            onClick={onClose}
            href="/privacy"
            className="text-left hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8 pb-6 text-xs text-muted-foreground">
        <hr className="my-4 border-teal/30" />
        <button
          onClick={handleSignOut}
          className="text-xs font-medium text-teal/80 hover:text-primary transition-colors"
        >
          Sign out →
        </button>

        <hr className="my-4 border-teal/30" />
        <p className="mb-2 hidden lg:block text-muted">
          <span className="mr-2 text-xs text-moreWhite/80 bg-background/50">
            Ctrl+B
          </span>
          to toggle sidebar
        </p>
        <p className="text-primary">
          Built by{" "}
          <span className="text-teal/80 font-medium">Syed Huzaifa</span>
        </p>
      </div>
    </div>
  );
}
