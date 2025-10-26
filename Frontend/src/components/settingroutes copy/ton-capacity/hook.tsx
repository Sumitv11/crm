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

export const useGetTonCapacitys = () => {
  return useQuery({
    queryKey: ["useGetTonCapacitys"],
    queryFn: () => fetchData("/api/ton-capacity/v1/getAll"),
  });
};

export const useTonCapacityRegister = () => {
  return useMutation({
    mutationFn: (data: any) =>
      fetchData("/api/ton-capacity/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess,
    onError: onError,
  });
};

export const useUpdateTonCapacity = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetchData(`/api/ton-capacity/update/${serviceId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data: any) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["useGetTonCapacitys"] });
    },
    onError: onError,
  });
};

export const useDeleteTonCapacity = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      fetchData(`/api/ton-capacity/deleteById/${serviceId}`, {
        method: "DELETE",
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["useGetTonCapacitys"] }); // Invalidate table data
      onSuccess(data.message);
    },
    onError: onError,
  });
};
