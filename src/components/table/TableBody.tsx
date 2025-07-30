import { tempItems } from "@/data/temp";
import ActionIcons from "./ActionIcons";

export default function TableBody() {
  return (
    <tbody className="bg-background text-moreWhite text-xs divide-y divide-muted/10">
      {tempItems.map((item, idx) => (
        <tr
          key={idx}
          className={`${
            idx % 2 === 0 ? "bg-background" : "bg-tealBg/5"
          } hover:bg-secondary/30 hover:shadow-sm transition duration-200`}
        >
          <td className="py-2 px-4 text-xs">{item.name}</td>
          <td className="py-2 px-4 text-xs">{item.category}</td>
          <td className="py-2 px-4 text-xs">{item.method}</td>
          <td className="py-2 px-4 text-xs">{item.cost.toFixed(2)}</td>
          <td className="py-2 px-4 text-xs text-center">
            <ActionIcons />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
