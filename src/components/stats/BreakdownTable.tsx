import { Stat } from "@/utils/stats";
import clsx from "clsx";

const tableCellClass = "px-[clamp(1rem,2vw,3rem)] py-4"; // fluid horizontal padding between 16px and 48px
const tableHeadClass = "py-4 text-left font-semibold";

interface Props {
  stats: Stat[];
  title: string;
  type: "Method" | "Category";
}
export default function BreakdownTable({ stats, title, type }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-moreWhite font-semibold text-lg sm:text-xl">
        {title}
      </h3>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[360px] text-[10px] sm:text-xs rounded-xl">
          <thead className="bg-secondary/60 text-moreWhite">
            <tr>
              <th
                className={clsx(
                  tableHeadClass,
                  tableCellClass,
                  "rounded-tl-xl"
                )}
              >
                {type}
              </th>
              <th className={clsx(tableHeadClass, tableCellClass)}>Amount</th>
              <th
                className={clsx(
                  tableHeadClass,
                  tableCellClass,
                  "rounded-tr-xl"
                )}
              >
                Percentage
              </th>
            </tr>
          </thead>
          <tbody>
            {stats.map((row, idx) => (
              <tr
                className={`${
                  idx % 2 === 0 ? "bg-background" : "bg-tealBg/15"
                } hover:bg-secondary/30 hover:shadow-sm transition duration-200 text-moreWhite`}
                key={row.type}
              >
                <td className={clsx(tableCellClass)}>{row.type}</td>
                <td className={clsx(tableCellClass)}>
                  {row.amount.toFixed(2)}
                </td>
                <td className={clsx(tableCellClass)}>
                  {row.percentage.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
