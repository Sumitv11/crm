 export interface FormValues {
    deliverBy: string;
    customerPoNo: string;
    name: string;
    address:string;
    jobId: string;
    invoiceNo: string;
    installationBy: string;
    salesPerson: string;
    localDateTime: string;
    deliveryChallanNo: string;
    storeInChargeId: {
      user_id: string;
      firstName: string;
    };
    transporterId: {
      user_id: string;
      firstName: string;
    };
    projectInChargeId: {
      user_id: string;
      firstName: string;
    };
    authorizeDetailsById: {
      user_id: string;
      firstName: string;
    };
    productQuantities:[
        {
            id:string,
        product:{id:string,productName:string,mrp:string},
        quantity:string
    },
    ]
  }

  export interface ProductQuantity{
    id:''
    product:{id:'',productName:'',mrp:''},
    quantity:string
    dispatchedQuantity:0
  }