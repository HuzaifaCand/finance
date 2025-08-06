export default function LoadingRows({ count = 7 }: { count?: number }) {
  return (
    <tbody className="bg-background">
      {Array.from({ length: count }).map((_, idx) => (
        <tr key={idx} className="animate-pulse transition-colors duration-200">
          <td className="py-4 px-4">
            <div className="h-2 sm:h-3 w-24 bg-teal/40 rounded-md shimmer" />
          </td>
          <td className="py-4 px-4">
            <div className="h-2 sm:h-3 w-20 bg-teal/40 rounded-md shimmer" />
          </td>
          <td className="py-4 px-4">
            <div className="h-2 sm:h-3 w-16 bg-teal/40 rounded-md shimmer" />
          </td>
          <td className="py-4 px-4">
            <div className="h-2 sm:h-3 w-14 bg-teal/40 rounded-md shimmer" />
          </td>
          <td className="py-4 px-4">
            <div className="h-2 sm:h-3 w-10 mx-auto bg-teal/30 rounded-full shimmer" />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
