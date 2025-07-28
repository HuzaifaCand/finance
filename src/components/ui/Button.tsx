import clsx from "clsx";

interface ButtonProps {
  variant: "fill" | "nofill";
  text: string;
  additionalStyles?: string;
}

export default function Button({
  variant,
  text,
  additionalStyles,
}: ButtonProps) {
  const baseStyle =
    "lg:px-16 px-12 py-2 mt-2 text-moreWhite focus:outline-none focus:ring-1 transition-all text-center duration-200 active:scale-95 font-medium rounded-md shadow-lg";

  const colorVariant = clsx({
    "bg-teal/60 hover:bg-teal/80 focus:bg-teal/80 focus:ring-accent/80":
      variant === "fill",
    "hover:bg-accent/30 border border-stroke focus:ring-highlight/60":
      variant === "nofill",
  });

  return (
    <button className={clsx(baseStyle, colorVariant, additionalStyles)}>
      {text}
    </button>
  );
}
