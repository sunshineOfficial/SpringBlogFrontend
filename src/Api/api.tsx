import axios from "axios";
import {LoginRequest, LoginResponse, RegisterRequest} from "./Interfaces/auth";
import {PageResponse, PostRequest, PostResponse} from "./Interfaces/post";
import {UserResponse} from "./Interfaces/user";
import {RoleResponse} from "./Interfaces/role";

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

export const getPostById = async (id: number) => {
  try {
    return await axios.get<PostResponse>(`http://localhost:8080/api/post/${id}`);
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

export const createPost = async (request: PostRequest, token: string) => {
  try {
    return await axios.post<number>(
      "http://localhost:8080/api/post",
      request,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
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

export const getCurrentUser = async (token: string) => {
  try {
    return await axios.get<UserResponse>("http://localhost:8080/api/user/current", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
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

export const getRoleById = async (id: number) => {
  try {
    return await axios.get<RoleResponse>(`http://localhost:8080/api/role/${id}`);
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

export const updatePost = async (id: number, request: PostRequest, token: string) => {
  try {
    return await axios.put<PostResponse>(
      `http://localhost:8080/api/post/${id}`,
      request,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
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

export const deletePost = async (id: number, token: string) => {
  try {
    return await axios.delete<string>(
      `http://localhost:8080/api/post/${id}`,
      {
        headers: {
          "Authorization": `Bearer ${token}`
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