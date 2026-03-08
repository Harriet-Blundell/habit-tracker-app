"use client";

import { useAuth } from "@/services/auth/AuthProvider";
import { useEffect } from "react";
import { signInWithGoogle } from "@/services/auth/auth";
import { useRouter } from "next/navigation";

const SignIn = () => {
    const { user, loading } = useAuth();
    const router = useRouter();

  return <></>;
};

export default SignIn;