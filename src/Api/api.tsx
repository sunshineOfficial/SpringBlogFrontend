import axios from "axios";
import {LoginRequest, LoginResponse, RegisterRequest} from "./Interfaces/auth";
import {PostPageResponse, PostRequest, PostResponse} from "./Interfaces/post";
import {UserResponse} from "./Interfaces/user";
import {RoleResponse} from "./Interfaces/role";
import {CommentPageResponse, CommentRequest, CommentResponse} from "./Interfaces/comment";

/**
 * Аутентифицирует пользователя.
 * 
 * @param request объект запроса на аутентификацию
 */
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

/**
 * Регистрирует нового пользователя.
 * 
 * @param request объект запроса на регистрацию
 */
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

/**
 * Получает список постов с возможностью фильтрации по параметрам.
 *
 * @param pageNumber номер страницы
 * @param pageSize   количество постов на странице
 * @param userId     идентификатор пользователя, чьи посты нужно отобразить
 * @param published  флаг, указывающий, опубликованы ли посты
 */
export const getAllPosts = async (
  pageNumber: number = 0,
  pageSize: number = 10,
  userId: number | null = null,
  published: boolean | null = null) => {
  try {
    let request: string = `http://localhost:8080/api/post?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (userId) request = request.concat(`&userId=${userId}`);
    if (published !== null) request = request.concat(`&published=${published}`);
    
    return await axios.get<PostPageResponse>(request);
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

/**
 * Получает пользователя по указанному идентификатору.
 *
 * @param id идентификатор пользователя
 */
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

/**
 * Получает пост по указанному идентификатору.
 *
 * @param id идентификатор поста
 */
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

/**
 * Создает новый пост.
 *
 * @param request запрос на создание поста
 * @param token   JWT-токен
 */
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

/**
 * Получает пользователя, отправившего запрос.
 *
 * @param token JWT-токен
 */
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

/**
 * Получает роль по указанному идентификатору.
 *
 * @param id идентификатор роли
 */
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

/**
 * Обновляет пост по заданному идентификатору.
 *
 * @param id      идентификатор поста
 * @param request объект запроса на обновление поста
 * @param token   JWT-токен
 */
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

/**
 * Удаляет пост по указанному идентификатору.
 *
 * @param id    идентификатор поста
 * @param token JWT-токен
 */
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

/**
 * Получает список комментариев с возможностью фильтрации по параметрам.
 *
 * @param pageNumber номер страницы
 * @param pageSize   количество комментариев на странице
 * @param userId     идентификатор пользователя, чьи комментарии нужно отобразить
 * @param postId     идентификатор поста, к которому относятся комментарии
 * @param published  флаг, указывающий, опубликованы ли комментарии
 */
export const getAllComments = async (
  pageNumber: number = 0,
  pageSize: number = 10,
  userId: number | null = null,
  postId: number | null = null,
  published: boolean | null = null) => {
  try {
    let request: string = `http://localhost:8080/api/comment?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (userId) request = request.concat(`&userId=${userId}`);
    if (postId) request = request.concat(`&postId=${postId}`);
    if (published !== null) request = request.concat(`&published=${published}`);

    return await axios.get<CommentPageResponse>(request);
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

/**
 * Создает новый комментарий.
 *
 * @param request запрос на создание комментария
 * @param token   JWT-токен
 */
export const createComment = async (request: CommentRequest, token: string) => {
  try {
    return await axios.post<number>(
      "http://localhost:8080/api/comment",
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

/**
 * Удаляет комментарий по указанному идентификатору.
 *
 * @param id    идентификатор комментария
 * @param token JWT-токен
 */
export const deleteComment = async (id: number, token: string) => {
  try {
    return await axios.delete<string>(
      `http://localhost:8080/api/comment/${id}`,
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

/**
 * Выполняет публикацию поста с указанным идентификатором.
 *
 * @param id    идентификатор поста
 * @param token JWT-токен
 */
export const publishPost = async (id: number, token: string) => {
  try {
    return await axios.put<PostResponse>(
      `http://localhost:8080/api/post/${id}/publish`,
      {},
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

/**
 * Выполняет публикацию комментария с указанным идентификатором.
 *
 * @param id    идентификатор комментария
 * @param token JWT-токен
 */
export const publishComment = async (id: number, token: string) => {
  try {
    return await axios.put<CommentResponse>(
      `http://localhost:8080/api/comment/${id}/publish`,
      {},
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