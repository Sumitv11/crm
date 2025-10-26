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

export const useGetOrderTypes = () => {
  return useQuery({
    queryKey: ["useGetOrderTypes"],
    queryFn: () => fetchData("/api/order-type/v1/getAll"),
  });
};

export const useOrderTypeRegister = () => {
  return useMutation({
    mutationFn: (data: any) =>
      fetchData("/api/order-type/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess,
    onError: onError,
  });
};

export const useUpdateOrderType = (serviceId: any) => {
  const queryClient = useQueryClient();
 console.log(data)
  return useMutation({
    mutationFn: (data: any) =>
      fetchData(`/api/order-type/update/${serviceId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data: any) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["useGetOrderTypes"] });
    },
    onError: onError,
  });
};

export const useDeleteOrderType = (serviceId: number) => {
  const queryClient = useQueryClient();
console.log(serviceId)
  return useMutation({
    mutationFn: () =>
      fetchData(`/api/order-type/deleteById/${serviceId}`, {
        method: "DELETE",
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["useGetOrderTypes"] }); // Invalidate table data
      onSuccess(data.message);
    },
    onError: onError,
  });
};
