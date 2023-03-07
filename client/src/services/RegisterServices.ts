import axios from "axios";
import { generalResponse } from "../domain/responses/generalResponse";
import { signInValueTypes } from "../domain/entities/Register";

export const registerService = async (
    values: signInValueTypes
  ): Promise<generalResponse> => {
    const instance = axios.create({
      baseURL: "http://localhost:8000/",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    });
    return await instance.post(`/account/register`, values)
      .then((response: generalResponse) => response);
  };