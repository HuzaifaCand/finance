export default function Content() {
  return (
    <div className="space-y-12 pr-4 mt-16">
      <h1 className="text-moreWhite font-bold text-md">
        Hey, <span className="text-teal">[Name]</span>
      </h1>

      <div className="flex flex-col gap-2 text-muted-foreground text-sm font-medium">
        <button className="text-left hover:text-primary text-muted transition-colors">
          Shortcuts{" "}
          <kbd className="text-primary/80 bg-secondary/60 text-[10px] ml-2 px-1 rounded py-0.5 hidden lg:inline">
            Alt+S
          </kbd>
        </button>
        <button className="text-left hover:text-primary text-muted transition-colors">
          Why track finances
        </button>
        <button className="text-left hover:text-primary text-muted transition-colors">
          About
        </button>
      </div>
      <hr className="my-4 text-teal/30" />
      <div className="space-y-4">
        <p className="text-moreWhite text-xs">
          Built by <span className="text-teal/80">Syed Huzaifa</span>
        </p>

        <p className="text-[11px] text-muted hidden lg:inline">
          <kbd className="px-1 py-0.5 bg-secondary/60 text-primary/80 rounded">
            Ctrl+B
          </kbd>{" "}
          to toggle sidebar
        </p>
      </div>
    </div>
  );
}
