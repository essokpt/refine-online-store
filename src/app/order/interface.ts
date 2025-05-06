import { IProductItem } from "@app/product/interface"

export interface IOrder {
    id: number
    code: string
    brand: string
    orderType: string
    paymentType: string
    discount: number
    vat: number
    createBy: string
    total: number
    status: string
    noted: string
    createdAt: string
    customer: string
    customerId: number
    orderItems: IOrderItem[]

}

export interface IOrderItem {
    id: number
    order: IOrder
    orderId: number
    productItem: IProductItem[]
    productItemId: number
    unit: string
    quantity: number
    unitPrice: number
    total: number
    discount: number
}