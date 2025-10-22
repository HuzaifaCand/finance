"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";

export default function FeedbackPage() {
  const user = useAuthStore((state) => state.user);
  const { loading } = useAuthStore();
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-120">
        <div className="flex items-center gap-2 text-teal text-sm font-medium">
          <span className="h-5 w-5 rounded-full border-2 border-teal border-t-transparent animate-spin" />
        </div>
      </div>
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !feedback.trim()) return;
    setSubmitting(true);

    try {
      await addDoc(collection(db, "feedback"), {
        user,
        text: feedback.trim(),
        createdAt: serverTimestamp(),
      });
      setFeedback("");
      toast.success("Thanks for your feedback!");
    } catch (err) {
      console.error("Error submitting feedback:", err);
      toast.error("Error submitting feedback");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-semibold text-moreWhite mb-4">
          Feedback
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write any feedback or feature request..."
            className="w-full h-40 p-4 bg-tealBg/5 border border-teal/10 text-xs sm:text-sm text-moreWhite placeholder-muted outline-none focus:border-teal/30 transition-all duration-200 resize-none"
          />

          <button
            type="submit"
            disabled={submitting}
            className="px-12 py-2 rounded-md text-xs sm:text-sm font-medium text-white bg-secondary hover:bg-deepAccent/80 disabled:opacity-50 transition-all duration-200 shadow-sm"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
