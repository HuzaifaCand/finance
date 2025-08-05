import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";

interface Props {
  method: string;
  setMethod: (c: string) => void;
  methods: string[];
}

export default function MethodInput({ method, setMethod, methods }: Props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const filtered =
    method === ""
      ? methods
      : methods.filter((c) => c.toLowerCase().startsWith(method.toLowerCase()));

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev === 0 ? filtered.length - 1 : prev - 1
      );
    } else if (e.key === "Enter" && filtered[highlightedIndex]) {
      e.preventDefault();
      setMethod(filtered[highlightedIndex]);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    setHighlightedIndex(0);
  }, [method]);

  return (
    <div className="flex flex-col flex-1">
      <label className="block text-xs font-light text-moreWhite mb-1">
        Payment Method
      </label>

      <div className="relative">
        <input
          required
          onFocus={() => setShowDropdown(true)}
          onMouseDown={() => {
            setMethod(method);
            setShowDropdown(false);
          }}
          onInvalid={(e) => e.preventDefault()}
          type="text"
          value={method}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setMethod(e.target.value);
            setShowDropdown(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Cash, Card, Octopus, Other, etc."
          className="w-full px-3 py-2 rounded-md bg-secondary/50 text-moreWhite border border-muted/10 text-xs focus:outline-none focus:bg-tealBg"
        />

        {filtered.length > 0 && showDropdown && (
          <ul className="absolute z-10 mt-1 w-full text-xs bg-background border border-secondary/30 rounded-md shadow-sm max-h-40 overflow-y-auto custom-scrollbar">
            {filtered.map((item, i) => (
              <li
                key={item}
                onBlur={() => {
                  setTimeout(() => setShowDropdown(false), 100);
                }}
                onClick={() => {
                  setMethod(item);
                  setShowDropdown(false);
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-secondary transition text-moreWhite ${
                  i === highlightedIndex ? "bg-secondary/80 font-semibold" : ""
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
