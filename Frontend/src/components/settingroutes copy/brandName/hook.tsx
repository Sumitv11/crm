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

export const useGetBrandNames = () => {
  return useQuery({
    queryKey: ["useGetBrandNames"],
    queryFn: () => fetchData("/api/brand-name/v1/getAll"),
  });
};

export const useBrandNameRegister = () => {
  return useMutation({
    mutationFn: (data: any) =>
      fetchData("/api/brand-name/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess,
    onError: onError,
  });
};

export const useUpdateBrandName = (serviceId: any) => {
  const queryClient = useQueryClient();
 console.log(data)
  return useMutation({
    mutationFn: (data: any) =>
      fetchData(`/api/brand-name/update/${serviceId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data: any) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["useGetBrandNames"] });
    },
    onError: onError,
  });
};

export const useDeleteBrandName = (serviceId: number) => {
  const queryClient = useQueryClient();
console.log(serviceId)
  return useMutation({
    mutationFn: () =>
      fetchData(`/api/brand-name/deleteById/${serviceId}`, {
        method: "DELETE",
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["useGetBrandNames"] }); // Invalidate table data
      onSuccess(data.message);
    },
    onError: onError,
  });
};
