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

export const useGetServices = () => {
  return useQuery({
    queryKey: ["useGetServices"],
    queryFn: () => fetchData("/api/services/getAll"),
  });
};

export const useServiceRegister = () => {
  // console.log("in create");
  return useMutation({
    mutationFn: (data: any) =>
      fetchData("/api/services/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess,
    onError: onError,
  });
};

export const useUpdateService = (serviceId: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      fetchData(`/api/services/update/${serviceId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data: any) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["useGetServices"] });
    },
    onError: onError,
  });
};

export const useDeleteService = (serviceId: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      fetchData(`/api/services/delete/${serviceId}`, {
        method: "DELETE",
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["useGetServices"] }); // Invalidate table data
      onSuccess(data.message);
    },
    onError: onError,
  });
};


export const useGetServiceNo = () => {
  return useMutation({
    mutationFn: () =>
      fetchData("/api/services/getNextServiceNo", {
        method: "GET",
      }),
    // onSuccess,
    onError,
  });
};


export const useGetServiceById = (serviceId: any) => {
  return useMutation({
    mutationFn: () =>
      fetchData(`/api/services/getById/${serviceId}`, {
        method: "GET",
      }),
    // onSuccess,
    onError,
  });
};