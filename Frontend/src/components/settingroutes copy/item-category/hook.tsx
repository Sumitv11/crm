// hooks/useGetServices.js
import { fetchData } from "@/serviceApi/serviceApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { data } from "react-router-dom";

const onSuccess = (data: any) => {
  toast.success(data?.message || "Operation Successful");
};

const onError = (error: any) => {
  toast.error(error?.message || "Operation Failed");
};

export const useGetItemCategories = () => {
  return useQuery({
    queryKey: ["useGetItemCategories"],
    queryFn: () => fetchData("/api/item-category/v1/getAll"),
  });
};

export const useItemCategoryRegister = () => {
  return useMutation({
    mutationFn: (data: any) =>
      fetchData("/api/item-category/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess,
    onError: onError,
  });
};

export const useUpdateItemCategory = (serviceId: any) => {
  const queryClient = useQueryClient();
 console.log(data)
  return useMutation({
    mutationFn: (data: any) =>
      fetchData(`/api/item-category/update/${serviceId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data: any) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["useGetItemCategories"] });
    },
    onError: onError,
  });
};

export const useDeleteItemCategory = (serviceId: number) => {
  const queryClient = useQueryClient();
console.log(serviceId)
  return useMutation({
    mutationFn: () =>
      fetchData(`/api/item-category/deleteById/${serviceId}`, {
        method: "DELETE",
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["useGetItemCategories"] }); // Invalidate table data
      onSuccess(data.message);
    },
    onError: onError,
  });
};
