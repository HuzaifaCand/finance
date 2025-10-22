export default function ExpensesDontExist({ type }: { type: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-96 text-center space-y-2">
      <h2 className="text-xl text-moreWhite font-bold">
        No expenses tracked yet
      </h2>
      <p className="text-muted text-xs sm:text-sm">
        Start tracking expenses to access statistics by {type}.
      </p>
    </div>
  );
}
