import { IStock } from "@app/stock/type"
import { IStore } from "@app/stores/type"

export interface IProduct {
    id: number
    model: string
    brand: string
    productName: string
    description: string
    price: number
    sellingPrice: number
    size: string
    weight: number
    status: string
    remark: string
    stockQuantity: number
    images: IProductImages[]
    productItems: IProductItem[]

    categoryId: number
    category: ICategory
    productTypeId: number
    productType: IProductType

}

export interface IProductType {
    id: number
    typeName: string
    remark: string
    image: string
    categories: ICategory[]
    products: IProduct[]
}

export interface ICategory {
    id: number
    name: string
    remark: string
    iconUrl: string
    productTypeId: number
    productType: IProductType
}

export interface IProductImages {
    id: number
    name: string
    url: string
}

export interface IProductItem {
    id: number
    serialNumber: string
    code: string
    lot: string
    color: string
    size: string
    quantity: number
    stockInValue: number
    stockOutValue: number
    unit: string
    sku: string
    mfg: Date
    exp: Date
    storeId: number
    stockOn: IStock
    stockId: number
    stockIn: IStore
    product: IProduct
    productId: number
}