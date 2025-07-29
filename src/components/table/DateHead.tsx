const today = new Date().toLocaleDateString("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

export default function DateHead() {
  return (
    <h1 className="text-3xl font-bold text-moreWhite tracking-tight">
      {today}
    </h1>
  );
}
