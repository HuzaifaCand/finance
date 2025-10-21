export default function Loading({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="flex items-center gap-2 text-teal text-sm font-medium">
        <span className="h-4 w-4 rounded-full border-2 border-teal border-t-transparent animate-spin" />
        <span>{text}</span>
      </div>
    </div>
  );
}
