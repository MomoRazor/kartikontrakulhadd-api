export type OrderData = {
    name: string;
    surname: string;
    email: string;
    mobileNumber: string;
    amount: number;
    delivery: boolean;
    addressLine1: string;
    addressLine2: string;
    locality: string;
    postCode: string;
    deliveryNote?: string;
};
