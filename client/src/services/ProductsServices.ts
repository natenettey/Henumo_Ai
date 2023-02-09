import axios from 'axios'
import { ProductTypes } from '../domain/entities/Product';
import { addProductResponse, getProductResponse } from '../domain/responses/productResponse';
import { tokenType } from '../domain/responses/productResponse';

export const addProduct = async(formValues:ProductTypes, token:tokenType):Promise<addProductResponse>=>{
  console.log("token from react",token);
  const instance = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
            "Content-type": "application/json",
            "Authorization":token
          },
  });
    return await instance.post(`/products/create-product`,formValues).then(
        (response:addProductResponse) => response)

}

export const getProducts = async(formValues:ProductTypes, token:tokenType):Promise<getProductResponse>=>{
  const instance = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
            "Content-type": "application/json",
            "Authorization":token
          },
    body: JSON.stringify(formValues)
  });
    return await instance.post(`/products/fetchproducts`,formValues).then(
        (response:getProductResponse) => response)

}
