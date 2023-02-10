import axios from "axios";
import { tokenType } from "../domain/responses/productResponse";
import { authResponse } from "../domain/responses/authResponse";

export const authService = async(token:tokenType):Promise<authResponse>=>{
    console.log("token from react",token);
    const instance = axios.create({
      baseURL: 'http://localhost:8000/',
      headers: {
              "authorization":token
            },
    });
      return await instance.get(`/account/auth-check`).then(
          (response:authResponse) => response)
  
  }
  