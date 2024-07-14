export type ProductOrder = {
    id: string
    productID: string
    quantity: number
    salePrice: number
    product: {
        productName: string
    }
}