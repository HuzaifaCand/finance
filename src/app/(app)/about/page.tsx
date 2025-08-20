"use client";

export default function AboutPage() {
  return (
    <div className="min-h-120 bg-background text-moreWhite flex items-center text-left justify-center px-1 py-12">
      <div className="max-w-3xl w-full p-8 text-left rounded-2xl shadow-lg border border-stroke space-y-4">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-primary text-left">
          About
        </h1>

        {/* Sections */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
          <section>
            <h2 className="font-semibold text-accent mb-1">FinanceHK</h2>
            <p className="text-muted">
              FinanceHK is a lightweight, fast, and efficient finance tracking
              app built with students in Hong Kong in mind. It is mobile-first,
              but also optimized for quick keyboard input so you can log an
              expense in seconds. The goal is simple: spend less time tracking
              and more time living (and studying)
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-accent mb-1">Current Features</h2>
            <p className="text-muted">
              • Quick expense entry with categories and payment methods <br />
              • Daily, weekly, and monthly statistics to understand your
              spending <br />
              • Custom categories so the app adapts to your lifestyle <br />•
              Clean and responsive UI designed for speed and simplicity
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-accent mb-1">Future Features</h2>
            <p className="text-muted">
              • Export your data and statistics for personal records <br />
              • Set weekly budgets and track progress automatically <br />
              • Budgets by category for more detailed control <br />• More I
              guess :)
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-accent mb-1">
              Why Track Expenses
            </h2>
            <p className="text-muted">
              Student life in Hong Kong can be expensive, and small daily costs
              add up quickly. By tracking your spending, you can build awareness
              of your habits, avoid surprises at the end of the month, and start
              developing healthy financial routines early. Setting budgets keeps
              you in control. Statistics give you clarity on your spending. Its
              just an all round win.
            </p>
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
