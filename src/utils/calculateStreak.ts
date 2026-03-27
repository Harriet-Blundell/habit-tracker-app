import { formatTodaysDate } from "./formatDate";

export function calculateStreak(dates: string[]): number {
  const convertedDates = new Set(dates);

  const currentDate = new Date();

  let streak = 0;

  while (convertedDates.has(formatTodaysDate(currentDate))) {
    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return streak;
}


/*

Tests:

- It 'returns a number'
- It 'returns a streak of one when the current date is in the convertedDates'
- It 'returns a streak of 0 when the current date is not in the convertedDates'




*/