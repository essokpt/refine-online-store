
export interface IStore {
    id: number
    storeName : string   
    description   : string
    status     : string
    remark     : string   

    storeTypeId : number
    productItems : []
} 