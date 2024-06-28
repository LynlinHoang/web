import { DetailOrder } from "./detailorder"

export type Order = {
    id: string
    orderTime: string
    acceptTime: string
    deliveryProvince: string
    deliveryAddress: string
    shipperID: string
    shippedTime: string
    finishedTime: string
    statusID: number
    customerID: string
    employeeID: string
    detailOrder: DetailOrder[]
}
