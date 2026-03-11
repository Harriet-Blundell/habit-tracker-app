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
    <div className="flex flex-col">
      <div className="flex flex-col items-center">
        <p>Hello, {user?.displayName}</p>

        <input
          className="my-4"
          placeholder="Add habit here..."
          onChange={handleOnChange}
          value={habit}
        ></input>
      </div>
      <button onClick={handleSubmit}>Click to add habit</button>

      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}
