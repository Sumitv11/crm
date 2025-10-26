import { fetchData } from "@/serviceApi/serviceApi";
import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";

const onSuccess = (data: any) => {
  toast.success(data?.message || "Operation Successful");
};

const onError = (error: any) => {
  toast.error(error?.message || "Operation Failed");
};

export const useGetDeliveryChallans = () => {
  return useQuery({
    queryKey: ["useGetDeliveryChallans"],
    queryFn: () => fetchData("/api/delivery-challan/v1/getAll"),
  });
};

export const useDeliveryChallanRegister = () => {
  return useMutation({
    mutationFn: (data: any) =>
      fetchData("/api/delivery-challan/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess,
    onError: onError,
  });
};

export const useUpdateDeliveryChallan = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetchData(`/api/delivery-challan/update/${serviceId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data: any) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["useGetDeliveryChallans"] });
    },
    onError: onError,
  });
};

export const useDeleteDeliveryChallan = (serviceId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      fetchData(`/api/delivery-challan/deleteById/${serviceId}`, {
        method: "DELETE",
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["useGetDeliveryChallans"] });
      onSuccess(data.message);
    },
    onError: onError,
  });
};

export const useGetDeliveryChallanNo = () => {
  return useMutation({
    mutationFn: () =>
      fetchData("/api/delivery-challan/getNextChallanNo", {
        method: "GET",
      }),
    // onSuccess,
    onError,
  });
};