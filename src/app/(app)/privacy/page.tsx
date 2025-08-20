"use client";

import PageTransitionWrapper from "@/components/PageTransitionWrapper";

export default function PrivacyPage() {
  return (
    <PageTransitionWrapper>
      <div className="min-h-120 bg-background text-moreWhite flex items-center text-left justify-center px-1 py-12">
        <div className="max-w-3xl w-full p-8 text-left rounded-2xl shadow-lg border border-stroke space-y-4">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-bold text-primary text-left">
            Privacy Policy
          </h1>

          {/* Intro */}
          <p className="text-muted leading-relaxed text-xs sm:text-sm">
            This Privacy Policy outlines how your data is handled when using our
            application.
          </p>

          {/* Sections */}
          <div className="space-y-4 sm:text-sm text-xs leading-relaxed">
            <section>
              <h2 className="font-semibold text-accent mb-1">
                1. Data Security
              </h2>
              <p className="text-muted">
                All of your data is securely stored and protected.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-accent mb-1">
                2. Personal Access
              </h2>
              <p className="text-muted">
                Only you have access to your data. No viewing or monitoring is
                done to your information.
              </p>
            </section>
          </div>

          {/* Footer */}
          <p className="text-xs text-muted text-left pt-4 border-t border-stroke">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </PageTransitionWrapper>
  );
}
