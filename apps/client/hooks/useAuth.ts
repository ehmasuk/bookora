// USE CASE: signin and signout user with auth js

import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

function useAuth() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (data: object) => {
    setLoading(true);
    const result = await signIn("credentials", { ...data, redirect: false });
    if (!result?.error) {
      setLoading(false);
      window.location.href = "/profile";
    } else {
      toast.error("Authentication failed");
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.href = "/";
  };

  return { handleLogin, handleLogout, loading };
}

export default useAuth;
