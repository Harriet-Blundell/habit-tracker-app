"use client";

import { signOutUser } from "@/services/auth/auth";
import { useAuth } from "@/services/auth/AuthProvider";
import { createHabit } from "@/services/habits/habits";
import { useState } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const [habit, setHabit] = useState("");

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setHabit(value);
  };

  const handleSubmit = async () => {
    const trimmedHabit = habit.trim();
    if (!user) return;
    if (!trimmedHabit) return;

    try {
      await createHabit(user.uid, habit);
      setHabit("");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col h-screen justify-between px-4 max-w-md mx-auto w-full">
      {/* Top: Hello */}
      <div className="flex flex-col items-center mt-8">
        <p className="text-lg md:text-xl font-semibold">Hello,</p>
        <p className="text-lg md:text-xl font-semibold mt-1 text-center">{user?.displayName}</p>
      </div>

      {/* Middle: Add habit input and button */}
      <div className="flex flex-col items-center">
        <input
          className="my-4 w-full max-w-xs rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add habit here..."
          onChange={handleOnChange}
          value={habit}
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
