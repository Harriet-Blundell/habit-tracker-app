export function formatTodaysDate(date: Date) {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());

  const padMonth = month.padStart(2, "0");
  const padDay = day.padStart(2, "0");

  const formattedDate = `${year}-${padMonth}-${padDay}`;

  return formattedDate;
}
