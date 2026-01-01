// use case: delete request to server

import axiosInstance from "@/lib/axiosInstance";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteDataProps {
  url: string;
  onSuccess?: () => void;
  onError?: () => void;
}

function useDelete() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const deleteData = async ({ url, onSuccess, onError }: DeleteDataProps) => {
    setLoading(true);
    try {
      await axiosInstance.delete(url);
      toast.success("Deleted successfully");
      onSuccess?.();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setError(true);
      onError?.();
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleteData };
}

export default useDelete;
