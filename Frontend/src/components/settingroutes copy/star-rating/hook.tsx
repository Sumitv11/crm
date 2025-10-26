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

export const useGetStarRatings = () => {
  return useQuery({
    queryKey: ["useGetServices"],
    queryFn: () => fetchData("/api/star-rating/v1/getAll"),
  });
};

export const useStarRatingRegister = () => {
  return useMutation({
    mutationFn: (data: any) =>
      fetchData("/api/star-rating/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess,
    onError: onError,
  });
};

export const useUpdateStarRating = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetchData(`/api/star-rating/update/${serviceId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data: any) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["useGetStarRatings"] });
    },
    onError: onError,
  });
};

export const useDeleteStarRating = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      fetchData(`/api/star-rating/deleteById/${serviceId}`, {
        method: "DELETE",
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["useGetStarRatings"] }); // Invalidate table data
      onSuccess(data.message);
    },
    onError: onError,
  });
};
