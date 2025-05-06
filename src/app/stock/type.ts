import { IProductItem } from "@app/product/interface"

export interface IStock {
    id: Number   
    code     : string
    note     : string  
    stockBy  : string 
    createdAt : Date
    productItems : IProductItem[]
} 