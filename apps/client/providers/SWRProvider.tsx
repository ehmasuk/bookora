"use client";
import axiosInstance from "@/lib/axiosInstance";
import { SWRConfig } from "swr";

export function SWRProvider({ children }: { children: React.ReactNode }) {
  const fetcher = async (url: string) => {
    try {
      const res = await axiosInstance.get(url);
      return res.data;
    } catch (err) {
      console.log("error fetching data from " + url, err);
      throw new Error("Something went wrong");
    }
  };

  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      {children}
    </SWRConfig>
  );
}
