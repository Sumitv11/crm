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

export const useGetCustomerType = () => {
  return useQuery({
    queryKey: ["useGetCustomerType"],
    queryFn: () => fetchData("/api/customer-type/v1/getAll"),
  });
};

export const useCustomerTypeRegister = () => {
  return useMutation({
    mutationFn: (data: any) =>
      fetchData("/api/customer-type/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess,
    onError: onError,
  });
};

export const useUpdateCustomerType = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetchData(`/api/customer-type/update/${serviceId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data: any) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["useGetCustomerType"] });
    },
    onError: onError,
  });
};

export const useDeleteCustomerType = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      fetchData(`/api/customer-type/deleteById/${serviceId}`, {
        method: "DELETE",
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["useGetCustomerType"] }); // Invalidate table data
      onSuccess(data.message);
    },
    onError: onError,
  });
};
