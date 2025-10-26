import { fetchData } from "@/serviceApi/serviceApi";
import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

import toast from "react-hot-toast";

const onSuccess = (data: any) => {
  toast.success(data?.message || "Operation Successful");
};

const onError = (error: any) => {
  toast.error(error?.message || "Operation Failed");
};

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["useGetProducts"],
    queryFn: () => fetchData("/api/product/v1/getAll"),
  });
};

export const useProductRegister = () => {
  return useMutation({
    mutationFn: (data: any) =>
      fetchData("/api/product/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess,
    onError: onError,
  });
};

export const useUpdateProduct = (serviceId: any) => {
  // console.log('in product update');
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      fetchData(`/api/product/update/${serviceId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data: any) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["useGetProducts"] });
    },
    onError: onError,
  });
};

export const useDeleteProduct = (serviceId: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      fetchData(`/api/product/deleteById/${serviceId}`, {
        method: "DELETE",
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["useGetProducts"] }); // Invalidate table data
      onSuccess(data.message);
    },
    onError: onError,
  });
};


export const useGetProductsByType = (productType: string) => {
  return useQuery({
    queryKey: ["products", productType],
    queryFn: () =>
      fetchData(
        `/api/product/findByProductType?productType=${productType}`
      ),
    enabled: !!productType,
  });
};