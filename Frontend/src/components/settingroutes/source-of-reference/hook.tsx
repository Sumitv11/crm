// hooks/useGetServices.js
import { fetchData } from "@/serviceApi/serviceApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

const onSuccess = (data: any) => {
  toast.success(data?.message || "Operation Successful");
};

const onError = (error: any) => {
  toast.error(error?.message || "Operation Failed");
};

export const useGetSourceReference = () => {
  return useQuery({
    queryKey: ["useGetSourceReference"],
    queryFn: () => fetchData("/api/source-reference/v1/getAll"),
  });
};

export const useSourceReferenceRegister = () => {
  return useMutation({
    mutationFn: (data: any) =>
      fetchData("/api/source-reference/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess,
    onError: onError,
  });
};

export const useUpdateSourceReference = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetchData(`/api/source-reference/update/${serviceId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data: any) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["useGetSourceReference"] });
    },
    onError: onError,
  });
};

export const useDeleteSourceReference = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      fetchData(`/api/source-reference/deleteById/${serviceId}`, {
        method: "DELETE",
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["useGetSourceReference"] }); // Invalidate table data
      onSuccess(data.message);
    },
    onError: onError,
  });
};
