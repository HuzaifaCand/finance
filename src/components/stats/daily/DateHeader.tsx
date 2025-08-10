import { format, parse } from "date-fns";

export default function DateHeader({ dateStr }: { dateStr: string }) {
  const date = parse(dateStr, "yyyy-MM-dd", new Date());
  return (
    <h2 className="text-moreWhite text-xl sm:text-2xl font-bold">
      {format(date, "EEEE, MMMM d")}
    </h2>
  );
}
