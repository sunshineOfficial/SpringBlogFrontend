import axios from "axios";
import {LoginRequest, LoginResponse, RegisterRequest} from "./Interfaces/auth";
import {PageResponse} from "./Interfaces/post";
import {UserResponse} from "./Interfaces/user";

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

export const register = async (request: RegisterRequest) => {
  try {
    return await axios.post<number>(
      "http://localhost:8080/api/auth/register",
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

export const getAllPosts = async (
  pageNumber: number = 0,
  pageSize: number = 10,
  userId: number | null = null,
  published: boolean | null = null) => {
  try {
    let request: string = `http://localhost:8080/api/post?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (userId) request = request.concat(`&userId=${userId}`);
    if (published) request = request.concat(`&published=${published}`);
    
    return await axios.get<PageResponse>(request);
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

export const getUserById = async (id: number) => {
  try {
    return await axios.get<UserResponse>(`http://localhost:8080/api/user/${id}`);
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