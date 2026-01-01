// USE CASE: post request to server with axios

import axiosInstance from "@/lib/axiosInstance";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";

interface PostDataProps<T> {
  url: string;
  data: Record<string, unknown>;
  onSuccess?: (data: T) => void;
  onError?: (error: string | null) => void;
  onFinally?: () => void;
}

function usePost() {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postData = async <T>({ url, data, onSuccess, onError, onFinally }: PostDataProps<T>) => {
    setLoading(true);
    try {
      const res:AxiosResponse<T> = await axiosInstance.post(url, data);
      setData(res.data);
      onSuccess?.(res.data);
    } catch (err) {
      let errorMessage = "Unknown error";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      console.log(err);
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      onFinally?.();
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
}

export default usePost;
