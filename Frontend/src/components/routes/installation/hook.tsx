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

export const useGetInstallations = () => {
  return useQuery({
    queryKey: ["useGetInstallations"],
    queryFn: () => fetchData("/api/installation/v1/getAll"),
  });
};

export const useInstallationRegister = () => {
  return useMutation({
    mutationFn: (data: any) =>
      fetchData("/api/installation/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess,
    onError: onError,
  });
};

export const useUpdateInstallation = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetchData(`/api/installation/update/${serviceId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data: any) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["useGetInstallations"] });
    },
    onError: onError,
  });
};

export const useDeleteInstallation = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      fetchData(`/api/installation/deleteById/${serviceId}`, {
        method: "DELETE",
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["useGetInstallations"] }); // Invalidate table data
      onSuccess(data.message);
    },
    onError: onError,
  });
};

export const useGetNextInstallationNo = () => {
  return useMutation({
    mutationFn: () =>
      fetchData("/api/installation/getNextInstallationNo", {
        method: "GET",
      }),
    // onSuccess,
    onError,
  });
};

export const useGetInstallationById = (serviceId: any) => {
  return useMutation({
    mutationFn: () =>
      fetchData(`/api/installation/getById/${serviceId}`, {
        method: "GET",
      }),
    // onSuccess,
    onError,
  });
};