"use client";

import { useAuth } from "@/services/auth/AuthProvider";
import { useEffect } from "react";
import { signInWithGoogle } from "@/services/auth/auth";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [loading, user, router]);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <button onClick={handleSignIn}>Sign in</button>
      )}
    </div>
  );
};

export default SignIn;
