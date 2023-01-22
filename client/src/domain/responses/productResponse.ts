import { ProductTypes } from "../entities/Product"

export type addProductResponse = {
    data:{
        status: string 
    message:string 
    }
    
}
export type getProductResponse = {
    data:{
        status: string 
    message:string 
    userProducts:ProductTypes
    }
    
}