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

export const useGetInstallationLocations = () => {
  return useQuery({
    queryKey: ["useGetInstallationLocations"],
    queryFn: () => fetchData("/api/installation-location/getAll"),
  });
};

export const useInstallationLocationRegister = () => {
  return useMutation({
    mutationFn: (data: any) =>
      fetchData("/api/installation-location/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess,
    onError: onError,
  });
};

export const useUpdateInstallationLocation = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetchData(`/api/installation-location/update/${serviceId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data: any) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["useGetInstallationLocations"] });
    },
    onError: onError,
  });
};

export const useDeleteInstallationLocation = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      fetchData(`/api/installation-location/deleteById/${serviceId}`, {
        method: "DELETE",
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["useGetInstallationLocations"] }); // Invalidate table data
      onSuccess(data.message);
    },
    onError: onError,
  });
};
