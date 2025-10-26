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

export const useGetCustomerStatus = () => {
  return useQuery({
    queryKey: ["useGetCustomerStatus"],
    queryFn: () => fetchData("/api/customer-status/v1/getAll"),
  });
};

export const useCustomerStatusRegister = () => {
  return useMutation({
    mutationFn: (data: any) =>
      fetchData("/api/customer-status/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess,
    onError: onError,
  });
};

export const useUpdateCustomerStatus = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetchData(`/api/customer-status/update/${serviceId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data: any) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["useGetCustomerStatus"] });
    },
    onError: onError,
  });
};

export const useDeleteCustomerStatus = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      fetchData(`/api/customer-status/deleteById/${serviceId}`, {
        method: "DELETE",
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["useGetCustomerStatus"] }); // Invalidate table data
      onSuccess(data.message);
    },
    onError: onError,
  });
};
