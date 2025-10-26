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

export const useGetItemStatus = () => {
  return useQuery({
    queryKey: ["useGetItemStatus"],
    queryFn: () => fetchData("/api/item-status/v1/getAll"),
  });
};

export const useItemStatusRegister = () => {
  return useMutation({
    mutationFn: (data: any) =>
      fetchData("/api/item-status/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess,
    onError: onError,
  });
};

export const useUpdateItemStatus = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetchData(`/api/item-status/update/${serviceId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data: any) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["useGetItemStatus"] });
    },
    onError: onError,
  });
};

export const useDeleteItemStatus = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      fetchData(`/api/item-status/deleteById/${serviceId}`, {
        method: "DELETE",
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["useGetItemStatus"] }); // Invalidate table data
      onSuccess(data.message);
    },
    onError: onError,
  });
};
