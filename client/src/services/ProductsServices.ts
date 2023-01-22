import axios from 'axios'
import Cookies from "js-cookie";
import { ProductTypes } from '../domain/entities/Product';
import { addProductResponse, getProductResponse } from '../domain/responses/productResponse';

const token = Cookies.get("authToken");
const instance = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
          "Content-type": "application/json",
          "x-access-token": token
        },
});


export const addProduct = async(formValues:ProductTypes):Promise<addProductResponse>=>{
    return await instance.post(`/products/create-product`,formValues).then(
        (response:addProductResponse) => response)

}

export const getProducts = async(formValues:ProductTypes):Promise<getProductResponse>=>{
    return await instance.post(`/products/fetchproducts`,formValues).then(
        (response:getProductResponse) => response)

}
