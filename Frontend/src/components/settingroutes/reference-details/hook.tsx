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

export const useGetReferenceDetail = () => {
  return useQuery({
    queryKey: ["useGetReferenceDetail"],
    queryFn: () => fetchData("/api/reference-detail/v1/getAll"),
  });
};

export const useReferenceDetailRegister = () => {
  return useMutation({
    mutationFn: (data: any) =>
      fetchData("/api/reference-detail/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess,
    onError: onError,
  });
};

export const useUpdateReferenceDetail = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetchData(`/api/reference-detail/update/${serviceId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data: any) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["useGetReferenceDetail"] });
    },
    onError: onError,
  });
};

export const useDeleteReferenceDetail = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      fetchData(`/api/reference-detail/deleteById/${serviceId}`, {
        method: "DELETE",
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["useGetReferenceDetail"] }); // Invalidate table data
      onSuccess(data.message);
    },
    onError: onError,
  });
};
