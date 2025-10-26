import { fetchData } from "@/serviceApi/serviceApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

const onSuccess = (data: any) => {
  toast.success(data?.message || "Operation Successful");
};

const onError = (error: any) => {
  toast.error(error?.message || "Operation Failed");
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["useGetUsers"],
    queryFn: () => fetchData("/api/user/getAlluser"),
  });
};

export const useUserRegister = () => {
  return useMutation({
    mutationFn: (data: any) =>
      fetchData("/api/user/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess,
    onError: onError,
  });
};

export const useUpdateUser = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetchData(`/api/user/edit/${serviceId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data: any) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["useGetUsers"] });
    },
    onError: onError,
  });
};

export const useDeleteUser = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      fetchData(`/api/user/deleteUser/${serviceId}`, {
        method: "DELETE",
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["useGetUsers"] }); // Invalidate table data
      onSuccess(data.message);
    },
    onError: onError,
  });
};
