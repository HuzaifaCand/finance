"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-moreWhite flex items-center text-left justify-center px-6 py-12">
      <div className="max-w-2xl w-full p-8 text-left rounded-2xl shadow-lg border border-stroke space-y-4">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-primary text-left">About</h1>

        {/* Sections */}
        <div className="space-y-4 text-sm leading-relaxed">
          <section>
            <h2 className="font-semibold text-accent mb-1">FinanceHK</h2>
            <p className="text-muted">
              FinanceHK is a lightweight, fast, efficient, finance tracking app
              built for students in Hong Kong. It is a mobile-first but
              keyboard-optimized expense tracker
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-accent mb-1">Current Features</h2>
            <p className="text-muted">
              Only you have access to your data. No viewing or monitoring is
              done to your information.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-accent mb-1">Future Features</h2>
            <p className="text-muted">The ability to export your data</p>
          </section>
        </div>

        {/* Footer */}
        <p className="text-xs text-muted text-left pt-4 border-t border-stroke">
          By <span className="text-teal/80">Syed Huzaifa</span>
        </p>
      </div>
    </div>
  );
}
