export enum ProductType {
    PRODUCT = "PRODUCT",
    MATERIAL = "MATERIAL",
    AMC = "AMC",
    REPAIR = "REPAIR",
    SALE = "SALE",
  }

export enum JobType{
    VRV ="VRV",
    NON_VRV ="NON_VRV",
}  

export enum Company{
    AIRTECH ="AIRTECH" , VAKHARIA_AIRTECH="VAKHARIA_AIRTECH"
}

export enum Reference{
    ARCHITECT ="ARCHITECT",
	INTERIOR_DESIGN_DETAIL="INTERIOR_DESIGN_DETAIL",
	PMC ="PMC",
}

export enum ProjectType {
	MEASUREMENT ="MEASUREMENT",
	LUM_SUM ="LUM_SUM"
}

export interface Customer {
    id: string;
    customerName: string;
    address1: string;
    contactNumber: string;
    contactPerson: string;
    email: string;
  }