"use client";

import { signOutUser } from "@/services/auth/auth";
import { useAuth } from "@/services/auth/AuthProvider";
import {
  createHabit,
  deleteHabit,
  getHabitCheckinDates,
  getHabitCheckInExists,
  getHabits,
  setHabitCheckin,
} from "@/services/habits/habits";
import { calculateStreak } from "@/utils/calculateStreak";
import { formatTodaysDate } from "@/utils/formatDate";
import { useEffect, useState } from "react";
import Habit from "../components/Habit";
import { Header } from "../components/Header";
import { AddHabit } from "../components/AddHabit";
import { SignOut } from "../components/SignOut";

export type HabitWithTodayStatus = {
  id: string;
  name: string;
  completedToday: boolean;
  streak: number;
};

export default function Home() {
  const { user, loading } = useAuth();
  const [habitValue, setHabitValue] = useState("");
  const [habits, setHabits] = useState<HabitWithTodayStatus[]>([]);

  useEffect(() => {
    if (!user) return;
    const fetchHabits = async () => {
      try {
        const habits = await getHabits(user.uid);
        const date = formatTodaysDate(new Date());

        const enrichedHabits = await Promise.all(
          habits.map(async (habit) => {
            const exists = await getHabitCheckInExists(
              user.uid,
              habit.id,
              date
            );

            const habitCheckinDates = await getHabitCheckinDates(
              user.uid,
              habit.id
            );

            const streak = calculateStreak(habitCheckinDates);

            return {
              ...habit,
              completedToday: exists,
              streak,
            };
          })
        );

        setHabits(enrichedHabits);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHabits();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setHabitValue(value);
  };

  const handleSubmit = async () => {
    const trimHabitValue = habitValue.trim();
    if (!user) return;
    if (!trimHabitValue) return;

    try {
      const createdHabit = await createHabit(user.uid, trimHabitValue);
      setHabitValue("");
      setHabits((prev) => [
        ...prev,
        {
          id: createdHabit.id,
          name: trimHabitValue,
          completedToday: false,
          streak: 0,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateHabit = async (habitId: string, checked: boolean) => {
    if (!user) return;

    const today = formatTodaysDate(new Date());

    await setHabitCheckin(user.uid, habitId, today, checked);

    const habitCheckinDates = await getHabitCheckinDates(user.uid, habitId);

    const streak = calculateStreak(habitCheckinDates);

    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              completedToday: checked,
              streak,
            }
          : habit
      )
    );
  };

  const handleDeleteHabit = async (habitId: string) => {
    if (!user) return;
    await deleteHabit(user.uid, habitId);

    setHabits((prev) => prev.filter((habit) => habit.id !== habitId));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col h-screen justify-between px-4 max-w-md mx-auto w-full">
      {/* Top: Greeting */}
      <Header displayName={user?.displayName ?? ""} />

      {/* Habits data */}
      <div>
        {habits.map((habit) => {
          return (
            <Habit
              key={habit.id}
              habit={habit}
              onToggle={handleUpdateHabit}
              onDelete={handleDeleteHabit}
            />
          );
        })}
      </div>

      {/* Middle: Add habit input and button */}
      <AddHabit
        habitValue={habitValue}
        handleOnChange={(e) => handleOnChange(e)}
        handleSubmit={handleSubmit}
      />

      {/* Bottom: Sign out */}
      <SignOut handleSignOut={handleSignOut} />
    </div>
  );
}
