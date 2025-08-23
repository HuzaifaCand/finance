import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import { addCategory, getCustomCategories } from "@/lib/category";
import { toast } from "sonner";

interface Props {
  userId: string | null;
  category: string;
  setCategory: (c: string) => void;
  customCategory: boolean;
  setCustomCategory: (v: boolean) => void;
  baseCategories: string[];
}

export default function CategoryInput({
  userId,
  category,
  setCategory,
  customCategory,
  setCustomCategory,
  baseCategories,
}: Props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [fullCategories, setFullCategories] =
    useState<string[]>(baseCategories);

  useEffect(() => {
    async function loadCategories() {
      const custom = await getCustomCategories(userId ? userId : "");
      const names = custom.map((c) => c.category);
      // Remove duplicates
      const merged = Array.from(new Set([...baseCategories, ...names]));
      setFullCategories(merged);
    }

    loadCategories();
  }, [userId, baseCategories]);

  const filtered =
    category === ""
      ? fullCategories
      : fullCategories.filter((c) =>
          c.toLowerCase().startsWith(category.toLowerCase())
        );

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
      setCategory(filtered[highlightedIndex]);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    setHighlightedIndex(0);
  }, [category]);

  const handleAddCategory = async () => {
    await addCategory(userId ? userId : "", category);
    setFullCategories((prev) => Array.from(new Set([...prev, category])));
    setCustomCategory(false);
    toast.success("Category has been added!");
  };

  return (
    <div className="flex flex-col flex-1">
      <label className="block text-xs font-light text-moreWhite mb-1">
        Category
      </label>

      {!customCategory ? (
        <div className="relative">
          <input
            required
            onInvalid={(e) => e.preventDefault()}
            onBlur={() => {
              setTimeout(() => setShowDropdown(false), 200);
            }}
            onFocus={() => setShowDropdown(true)}
            onMouseDown={() => {
              setCategory(category);
              setShowDropdown(false);
            }}
            type="text"
            value={category}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCategory(e.target.value);
              setShowDropdown(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search categories or create new"
            className="w-full px-3 py-2 rounded-md bg-secondary/50 text-moreWhite border border-muted/10 text-xs focus:outline-none focus:bg-tealBg"
          />

          {filtered.length > 0 && showDropdown && (
            <ul className="absolute z-10 mt-1 w-full text-xs bg-background border border-secondary/30 rounded-md shadow-sm max-h-40 overflow-y-auto custom-scrollbar">
              {filtered.map((item, i) => (
                <li
                  key={item}
                  onBlur={() => {
                    setTimeout(() => setShowDropdown(false), 200);
                  }}
                  onClick={() => {
                    setCategory(item);
                    setShowDropdown(false);
                  }}
                  onMouseDown={() => {
                    setCategory(item);
                    setShowDropdown(false);
                  }}
                  className={`px-4 py-2 cursor-pointer hover:bg-secondary/50 text-moreWhite ${
                    i === highlightedIndex ? "bg-secondary/50" : ""
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}

          {category && filtered.length === 0 && (
            <p className="text-xs text-teal mt-2">
              Category not found.{" "}
              <button
                type="button"
                onClick={() => {
                  setCustomCategory(true);
                }}
                className="underline underline-offset-2 hover:text-teal/70"
              >
                Add new category
              </button>
            </p>
          )}
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            required
            onInvalid={(e) => e.preventDefault()}
            type="text"
            value={category}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCategory(e.target.value)
            }
            placeholder="Enter new category name"
            className="w-full px-3 py-2 rounded-md bg-secondary/50 text-moreWhite border border-muted/10 text-xs focus:outline-none focus:bg-tealBg"
          />
          <button
            type="button"
            onClick={handleAddCategory}
            className="px-3 py-2 text-xs bg-teal text-background active:bg-teal/50 rounded-md"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
