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

export const useGetRefGasType = () => {
  return useQuery({
    queryKey: ["useGetRefGasType"],
    queryFn: () => fetchData("/api/ref-gasType/v1/getAll"),
  });
};

export const useRefGasTypeRegister = () => {
  return useMutation({
    mutationFn: (data: any) =>
      fetchData("/api/ref-gasType/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess,
    onError: onError,
  });
};

export const useUpdateRefGasType = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetchData(`/api/ref-gasType/update/${serviceId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data: any) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["useGetRefGasType"] });
    },
    onError: onError,
  });
};

export const useDeleteRefGasType = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      fetchData(`/api/ref-gasType/deleteById/${serviceId}`, {
        method: "DELETE",
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["useGetRefGasType"] }); // Invalidate table data
      onSuccess(data.message);
    },
    onError: onError,
  });
};
