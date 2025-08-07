import { baseCategories } from "@/lib/category";

export default function BaseList() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-moreWhite">
        Base Categories
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {baseCategories.map((cat) => (
          <li
            key={cat}
            className="px-3 py-2 rounded-lg bg-secondary/30 hover:bg-secondary/60 transition duration-200 text-moreWhite/90 border border-muted/20 text-sm"
          >
            {cat}
          </li>
        ))}
      </ul>
    </section>
  );
}
