import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./firebase";
import { endOfWeek, parse, startOfWeek, format } from "date-fns";

// using date-fns

export async function getActiveDates(userId: string) {
  const dateRef = collection(db, "users", userId, "dates");
  const snapshot = await getDocs(query(dateRef));

  return snapshot.docs.map((d) => d.id).sort();
  // dates are in the format dd-mm-yyyy
}

export async function getActiveWeeks(activeDates: string[]) {
  // convert the string to an actual date object
  const parsedDates = activeDates.map((dateStr) =>
    parse(dateStr, "dd-MM-yyyy", new Date())
  );

  const weeksMap = new Map<
    string,
    { label: string; start: string; end: string }
  >();

  for (const date of parsedDates) {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    const end = endOfWeek(date, { weekStartsOn: 1 });

    const label = `${format(start, "MMM dd")} - ${format(end, "MMM dd, yyyy")}`;
    const startISO = format(start, "yyyy-MM-dd");
    const endISO = format(end, "yyyy-MM-dd");

    if (!weeksMap.has(label)) {
      weeksMap.set(label, { label, start: startISO, end: endISO });
    }
  }

  return Array.from(weeksMap.values()).sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );
}

export async function getActiveDatesInWeek(
  activeDates: string[],
  start: string,
  end: string
) {
  const startDate = parse(start, "yyyy-MM-dd", new Date());
  const endDate = parse(end, "yyyy-MM-dd", new Date());

  return activeDates.filter((dateStr) => {
    const d = parse(dateStr, "dd-MM-yyyy", new Date());
    return d >= startDate && d <= endDate;
  });
}

export function getPrevDate(dateStr: string): string {
  // Parse the input string as a Date
  const date = new Date(dateStr);

  // subtract one day (in ms)
  date.setDate(date.getDate() - 1);

  // format back to yyyy-mm-dd with leading zeros
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}
