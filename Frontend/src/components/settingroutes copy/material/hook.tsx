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

export const useGetMaterials = () => {
  return useQuery({
    queryKey: ["useGetMaterials"],
    queryFn: () => fetchData("/api/materials/v1/getAll"),
  });
};

export const useMaterialRegister = () => {
  return useMutation({
    mutationFn: (data: any) =>
      fetchData("/api/materials/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess,
    onError: onError,
  });
};

export const useUpdateMaterial = (serviceId: any) => {
  const queryClient = useQueryClient();
 console.log(data)
  return useMutation({
    mutationFn: (data: any) =>
      fetchData(`/api/materials/update/${serviceId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data: any) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["useGetMaterials"] });
    },
    onError: onError,
  });
};

export const useDeleteMaterial = (serviceId: number) => {
  const queryClient = useQueryClient();
console.log(serviceId)
  return useMutation({
    mutationFn: () =>
      fetchData(`/api/materials/delete/${serviceId}`, {
        method: "DELETE",
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["useGetMaterials"] }); // Invalidate table data
      onSuccess(data.message);
    },
    onError: onError,
  });
};
