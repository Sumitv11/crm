import { fetchData } from "@/serviceApi/serviceApi";
import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

const onSuccess = (data: any) => {
  // toast.success(data?.message);
};

const onError = (error: any) => {
  toast.error(error?.message || "Operation Failed");
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (data: any) =>
      fetchData("/api/user/login", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess,
    onError,
  });
};
