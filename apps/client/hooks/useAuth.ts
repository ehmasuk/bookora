// USE CASE: signin and signout user with auth js

import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function useAuth() {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleLogin = async (data: object) => {
    setLoading(true);
    const result = await signIn("credentials", { ...data, redirect: false });
    if (!result?.error) {
      toast.success("Logged in successfully.");
      setLoading(false);
      router.push("/profile");
    } else {
      toast.error("Authentication failed");
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
    toast.success("Logged out successfully.");
  };

  return { handleLogin, handleLogout, loading };
}

export default useAuth;
