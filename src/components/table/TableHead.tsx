export default function TableHead() {
  return (
    <thead className="bg-secondary/60 text-moreWhite text-xs">
      <tr className="backdrop-blur-sm bg-secondary/20">
        <th className="py-4 px-4 text-left font-semibold rounded-tl-xl">
          Item Name
        </th>
        <th className="py-4 px-4 text-left font-semibold ">Category</th>
        <th className="py-4 px-4 text-left font-semibold ">Payment Method</th>
        <th className="py-4 px-4 text-left font-semibold">Cost</th>
        <th className="py-4 px-4 text-center font-semibold rounded-tr-xl"></th>
      </tr>
    </thead>
  );
}
