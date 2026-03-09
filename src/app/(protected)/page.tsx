"use client";

import { signOutUser } from "@/services/auth/auth";
import { useAuth } from "@/services/auth/AuthProvider";

export default function Home() {
  const { user, loading } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col">
      <p>Hello {user?.displayName}</p>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}
