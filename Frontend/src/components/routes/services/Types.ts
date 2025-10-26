type Material = {
    material: {};
    quantity: string;
  };
  
  type User = {
    user_id: string;
    firstName: string;
  };
  
  type NatureOfService = {
    natureOfService: string;
  };
  
  type NatureOfComplaint = {
    // id: number;
    natureOfComplaint: string;
  };
  
  type ServiceAttachment = {
    id: number;
    fileName: string; // Fixed typo: fileNmae -> fileName
    location: string;
  };
  
  export interface ServiceForm {
    serviceNo: string;
    contactPerson: string;
    serviceDate: string;
    product:{id:string,productName:string}
    client: {id:string,customerName:string,};
    problem: string;
    installationLocation:{id:string,installationLocationId:string};
    actionTaken: string;
    serviceManager: User;
    serviceProvidedBy: User;
    supportedBy: User;
    materialQuantity: Material[];
    isApproved: boolean;
    natureOfService: NatureOfService;
    natureOfComplaint: NatureOfComplaint;
    attachments: ServiceAttachment[]; 
  }
  