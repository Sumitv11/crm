import { fetchData } from "@/serviceApi/serviceApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

const onSuccess = (data: any) => {
  toast.success(data?.message || "Operation Successful");
};

const onError = (error: any) => {
  toast.error(error?.message || "Operation Failed");
};

export const useGetSales = () => {
  return useQuery({
    queryKey: ["useGetSales"],
    queryFn: () => fetchData("/api/sales/v1/getAll"),
  });
};

export const useSalesRegister = () => {
  console.log('sales register');
  return useMutation({
    mutationFn: (data: any) =>
      fetchData("/api/sales/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess,
    onError: onError,
  });
};

export const useGetSalesInvoiceNo = () => {
  // console.log('action in hook');
  return useMutation({
    mutationFn: () =>
      fetchData("/api/sales/getNextInvoiceNo", {
        method: "GET",
      }),
    // onSuccess,
    onError,
  });
};

export const useUpdateSales = (serviceId: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      fetchData(`/api/sales/update/${serviceId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data: any) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["useGetSales"] });
    },
    onError: onError,
  });
};

export const useDeleteSales = (serviceId: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      fetchData(`/api/sales/deleteById/${serviceId}`, {
        method: "DELETE",
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["useGetSales"] }); 
      onSuccess(data.message);
    },
    onError: onError,
  });
};


export const useGetInvoiceNoList= () => {
  return useMutation({
    mutationFn: () =>
      fetchData("/api/sales/getAllInVoiceNo", {
        method: "GET",
      }),
    // onSuccess,
    onError,
  });
};

export const useGetSalesByInvoiceNo= (invoiceNo:any) => {
  console.log('action in hook',invoiceNo);
  return useMutation({
    mutationFn: () =>
      fetchData(`/api/sales/getSalesByInvoiceNo?invoiceNo=${invoiceNo}`, {
        method: "GET",
      }),
    // onSuccess,
    onError,
  });
};