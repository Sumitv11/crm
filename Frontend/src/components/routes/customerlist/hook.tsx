import { fetchData } from "@/serviceApi/serviceApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

const onSuccess = (data: any) => {
  toast.success(data?.message || "Operation Successful");
};
 
const onError = (error: any) => {
  toast.error(error?.message || "Operation Failed");
};

export const useGetCustomerList = () => {
  return useQuery({
    queryKey: ["useGetCustomerList"],
    queryFn: () => fetchData("/api/customer-list/v1/getAll"),
  });
};

export const useCustomerListRegister = () => {
  return useMutation({
    mutationFn: (data: any) =>
      fetchData("/api/customer-list/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess,
    onError: onError,
  });
};

export const useUpdateCustomerList = (serviceId: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      fetchData(`/api/customer-list/update/${serviceId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data: any) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["useGetCustomerList"] });
    },
    onError: onError,
  });
};

export const useDeleteCustomerList = (serviceId: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      fetchData(`/api/customer-list/deleteById/${serviceId}`, {
        method: "DELETE",
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["useGetCustomerList"] }); // Invalidate table data
      onSuccess(data.message);
    },
    onError: onError,
  });
};
