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

export const useGetItemType = () => {
  return useQuery({
    queryKey: ["useGetItemType"],
    queryFn: () => fetchData("/api/item-type/v1/getAll"),
  });
};

export const useItemTypeRegister = () => {
  return useMutation({
    mutationFn: (data: any) =>
      fetchData("/api/item-type/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess,
    onError: onError,
  });
};


export const useUpdateItemType = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetchData(`/api/item-type/update/${serviceId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data: any) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["useGetItemType"] });
    },
    onError: onError,
  });
};

export const useDeleteItemType = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      fetchData(`/api/item-type/deleteById/${serviceId}`, {
        method: "DELETE",
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["useGetItemType"] }); // Invalidate table data
      onSuccess(data.message);
    },
    onError: onError,
  });
};
