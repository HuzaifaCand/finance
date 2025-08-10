import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./firebase";
import { parseISO, startOfWeek, endOfWeek, format } from "date-fns";

export async function getActiveDates(userId: string) {
  const dateRef = collection(db, "users", userId, "dates");
  const snapshot = await getDocs(query(dateRef));

  return snapshot.docs.map((d) => d.id).sort();
}

// Get all active weeks (only weeks with at least 1 active date)
export async function getActiveWeeks(userId: string) {
  const activeDates = await getActiveDates(userId);

  // Use a Set to avoid duplicate weeks
  const weekSet = new Set<string>();

  for (const dateStr of activeDates) {
    // Parse "YYYY-MM-DD" into a Date object
    const date = parseISO(dateStr);

    // Get Monday as start of the week
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });

    // Store week start date in ISO format (YYYY-MM-DD) to ensure uniqueness
    weekSet.add(format(weekStart, "yyyy-MM-dd"));
  }

  // Convert set → array of week objects, sorted by start date
  const activeWeeks = Array.from(weekSet)
    .map((startStr) => {
      const start = parseISO(startStr);
      const end = endOfWeek(start, { weekStartsOn: 1 });
      return { start, end };
    })
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  return activeWeeks;
}
