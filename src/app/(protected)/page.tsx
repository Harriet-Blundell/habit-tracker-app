"use client";

import { signOutUser } from "@/services/auth/auth";
import { useAuth } from "@/services/auth/AuthProvider";
import {
  createHabit,
  deleteHabit,
  getHabits,
  HabitType,
  updateHabitCompletion,
} from "@/services/habits/habits";
import { formatTodaysDate } from "@/utils/formatDate";
import { useEffect, useState } from "react";
import moment from "moment";

export default function Home() {
  const { user, loading } = useAuth();
  const [habitValue, setHabitValue] = useState("");
  const [habits, setHabits] = useState<HabitType[]>([]);

  useEffect(() => {
    if (!user) return;
    const fetchHabits = async () => {
      try {
        const habits = await getHabits(user.uid);
        setHabits(habits);
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
          completed: false,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateHabit = async (habitId: string, checked: boolean) => {
    if (!user) return;
    await updateHabitCompletion(user?.uid, habitId, checked);

    formatTodaysDate(new Date());

    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              completed: checked,
            }
          : habit
      )
    );
  };

  const handleDeleteHabit = async (habitId: string) => {
    if (!user) return;
    await deleteHabit(user?.uid, habitId);

    setHabits((prev) => prev.filter((habit) => habit.id !== habitId));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col h-screen justify-between px-4 max-w-md mx-auto w-full">
      {/* Top: Hello */}
      <div className="flex flex-col items-center mt-8">
        <p className="text-lg md:text-xl font-semibold">Hello,</p>
        <p className="text-lg md:text-xl font-semibold mt-1 text-center">
          {user?.displayName}
        </p>
      </div>

      {/* Habits data */}
      <div>
        {habits.map((habit) => {
          return (
            <div key={habit.id} className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                checked={habit.completed}
                onChange={(e) => {
                  const { checked } = e.target;
                  handleUpdateHabit(habit.id, checked);
                }}
                className="w-5 h-5 accent-blue-500 rounded-full focus:ring-0 focus:ring-blue-500 border border-gray-300"
              />
              <span
                className={
                  habit.completed ? "line-through text-gray-400" : "text-white"
                }
              >
                {habit.name}
              </span>
              <button
                className="ml-auto bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600 transition"
                onClick={() => handleDeleteHabit(habit.id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>

      {/* Middle: Add habit input and button */}
      <div className="flex flex-col items-center">
        <input
          className="my-4 w-full max-w-xs rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add habit here..."
          onChange={handleOnChange}
          value={habitValue}
          required
        />
        <button
          className="w-full max-w-xs bg-blue-500 text-white rounded p-2 mb-2 hover:bg-blue-600 transition"
          onClick={handleSubmit}
        >
          Add habit
        </button>
      </div>

      {/* Bottom: Sign out */}
      <div className="flex flex-col items-center mb-8">
        <button
          className="w-full max-w-xs bg-gray-500 text-white rounded p-2 hover:bg-gray-600 transition"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
