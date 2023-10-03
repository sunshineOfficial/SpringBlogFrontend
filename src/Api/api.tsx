import axios from "axios";
import {LoginRequest, LoginResponse} from "./Interfaces/auth";

export const login = async (request: LoginRequest) => {
  try {
    return await axios.post<LoginResponse>(
      "http://localhost:8080/api/auth/login",
      request,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log("Error message: ", e.message);

      if (e.response) return e.response;
      return e.message;
    } else {
      console.log("Unexpected error: ", e);

      return "An unexpected error has occurred";
    }
  }
}