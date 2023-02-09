import axios from "axios";
import { tokenType } from "../domain/responses/productResponse";
import { valueTypes } from "../domain/entities/Login";
import { loginResponse } from "../domain/responses/loginResponse";

export const loginService = async (
  values: valueTypes
): Promise<loginResponse> => {
  const instance = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(values),
  });
  return await instance.post(`/account/login`, values)
    .then((response: loginResponse) => response);
};
