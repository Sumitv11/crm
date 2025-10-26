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

export const useGetUnitMeasurements = () => {
  return useQuery({
    queryKey: ["useGetUnitMeasurements"],
    queryFn: () => fetchData("/api/unit-measurement/v1/getAll"),
  });
};

export const useUnitMeasurementRegister = () => {
  return useMutation({
    mutationFn: (data: any) =>
      fetchData("/api/unit-measurement/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess,
    onError: onError,
  });
};

export const useUpdateUnitMeasurement = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetchData(`/api/unit-measurement/update/${serviceId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data: any) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["useGetUnitMeasurements"] });
    },
    onError: onError,
  });
};

export const useDeleteUnitMeasurement = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      fetchData(`/api/unit-measurement/deleteById/${serviceId}`, {
        method: "DELETE",
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["useGetUnitMeasurements"] }); // Invalidate table data
      onSuccess(data.message);
    },
    onError: onError,
  });
};
