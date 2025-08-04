import { tempItems } from "@/data/temp";
import ActionIcons from "./ActionIcons";
import EmptyTable from "./EmptyTable";

export default function TableBody() {
  if (tempItems.length === 0) {
    return (
      <tbody className="bg-background">
        <EmptyTable />
      </tbody>
    );
  }
  return (
    <tbody className="bg-background">
      {tempItems.map((item, idx) => (
        <tr
          key={idx}
          className={`${
            idx % 2 === 0 ? "bg-background" : "bg-tealBg/15"
          } hover:bg-secondary/30 hover:shadow-sm transition duration-200`}
        >
          <td className="py-2 px-4 text-xs text-moreWhite">{item.name}</td>
          <td className="py-2 px-4 text-xs text-moreWhite">{item.category}</td>
          <td className="py-2 px-4 text-xs text-moreWhite">{item.method}</td>
          <td className="py-2 px-4 text-xs text-moreWhite">
            {item.cost.toFixed(2)}
          </td>
          <td className="py-2 px-4 text-xs text-center">
            <ActionIcons />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
