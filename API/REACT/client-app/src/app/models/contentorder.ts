export type ContentOrder = {
    id: string;
    orderTime: string;
    acceptTime: string;
    deliveryProvince: string;
    deliveryAddress: string;
    shipperID: string;
    shippedTime: string;
    finishedTime: string;
    statusID: number;
    customerID: string;
    customer: {

        customerName: string;
        email: string;
        address: string;
        phone: string;
        contactName: string;
    };
    employee: {
        fullName: string;
        email: string;
        phone: string;

    };
    shipper: {
        shipperName: string;
        phone: string;
    };
    status: {
        description: string
    }
};
