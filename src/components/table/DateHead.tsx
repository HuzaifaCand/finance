const today = new Date().toLocaleDateString("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

export default function DateHead() {
  return (
    <h1 className=" md:text-3xl text-2xl font-bold text-moreWhite tracking-tight">
      {today}
    </h1>
  );
}
