export default function TableHead() {
  return (
    <thead className="bg-secondary/60 text-moreWhite text-[10px] sm:text-xs">
      <tr>
        <th className="py-4 px-2 [@media(min-width:460px)]:px-3 [@media(min-width:740px)]:px-4 text-left font-semibold rounded-tl-xl">
          Desc
        </th>
        <th className="py-4 px-2 [@media(min-width:460px)]:px-3 [@media(min-width:740px)]:px-4 text-left font-semibold ">
          Category
        </th>
        <th className="py-4 px-2 [@media(min-width:460px)]:px-3 [@media(min-width:740px)]:px-4 text-left font-semibold ">
          Method
        </th>
        <th className="py-4 px-2 [@media(min-width:460px)]:px-3 [@media(min-width:740px)]:px-4 text-left font-semibold">
          Cost
        </th>
        <th className="py-4 px-2 [@media(min-width:460px)]:px-3 [@media(min-width:740px)]:px-4 rounded-tr-xl"></th>
      </tr>
    </thead>
  );
}
