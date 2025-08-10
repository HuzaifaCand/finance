import clsx from "clsx";

const tableCellClass = "px-[clamp(1rem,2vw,3rem)] py-4"; // fluid horizontal padding between 16px and 48px
const tableHeadClass = "py-4 text-left font-semibold";

type category = {
  category: string;
  amount: number;
  percentage: number;
};
export default function BreakdownTable({
  categoryStats,
}: {
  categoryStats: category[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-moreWhite font-semibold text-lg sm:text-xl">
        Spending Breakdown
      </h1>

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
                Category
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
            {categoryStats.map((row, idx) => (
              <tr
                className={`${
                  idx % 2 === 0 ? "bg-background" : "bg-tealBg/15"
                } hover:bg-secondary/30 hover:shadow-sm transition duration-200 text-moreWhite`}
                key={row.category}
              >
                <td className={clsx(tableCellClass)}>{row.category}</td>
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
