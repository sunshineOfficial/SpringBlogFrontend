import axios from "axios";
import {LoginRequest, LoginResponse, RegisterRequest} from "./Interfaces/auth";
import {PostPageResponse, CreatePostRequest, PostResponse, UpdatePostRequest} from "./Interfaces/post";
import {UserPageResponse, UserResponse} from "./Interfaces/user";
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
    if (request.avatar === null) throw new Error("No avatar!");
    
    const formData = new FormData();
    formData.append("username", request.username);
    formData.append("password", request.password);
    formData.append("firstName", request.firstName);
    formData.append("lastName", request.lastName);
    formData.append("avatar", request.avatar);
    
    return await axios.post<number>(
      "http://localhost:8080/api/auth/register",
      formData
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
export const createPost = async (request: CreatePostRequest, token: string) => {
  try {
    if (request.image === null) throw new Error("No image!");
    
    const formData = new FormData();
    formData.append("title", request.title);
    formData.append("content", request.content);
    formData.append("image", request.image);
    
    return await axios.post<number>(
      "http://localhost:8080/api/post",
      formData,
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
export const updatePost = async (id: number, request: UpdatePostRequest, token: string) => {
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

/**
 * Получает аватар пользователя, отправившего запрос.
 *
 * @param token JWT-токен
 */
export const getCurrentUserAvatar = async (token: string) => {
  try {
    return await axios.get<any>("http://localhost:8080/api/user/current/avatar", {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      responseType: "blob"
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
 * Получает изображение поста по указанному идентификатору.
 *
 * @param id идентификатор поста
 */
export const getPostImage = async (id: number) => {
  try {
    return await axios.get<PostResponse>(`http://localhost:8080/api/post/${id}/image`, {
      responseType: "blob"
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
 * Меняет аватар пользователя.
 * 
 * @param avatar новый аватар пользователя
 * @param token  JWT-токен
 */
export const changeAvatar = async (avatar: File, token: string) => {
  try {
    const formData = new FormData();
    formData.append("avatar", avatar);
    
    return await axios.put<UserResponse>(
      "http://localhost:8080/api/user/current/avatar",
      formData,
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
 * Меняет изображение поста.
 *
 * @param id    идентификатор поста
 * @param image новое изображение поста
 * @param token JWT-токен
 */
export const changePostImage = async (id: number, image: File, token: string) => {
  try {
    const formData = new FormData();
    formData.append("image", image);

    return await axios.put<PostResponse>(
      `http://localhost:8080/api/post/${id}/image`,
      formData,
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
 * Меняет роль пользователя.
 *
 * @param userId идентификатор пользователя
 * @param roleId новая роль пользователя
 * @param token  JWT-токен
 */
export const changeRole = async (userId: number, roleId: number, token: string) => {
  try {
    return await axios.put<UserResponse>(
      `http://localhost:8080/api/user/${userId}/role`,
      {
        "roleId" : roleId
      },
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
 * Удаляет пользователя.
 *
 * @param id идентификатор пользователя
 * @param token  JWT-токен
 */
export const deleteUser = async (id: number, token: string) => {
  try {
    return await axios.delete<string>(
      `http://localhost:8080/api/user/${id}`,
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
 * Получает список пользователей с возможностью фильтрации по параметрам.
 *
 * @param pageNumber номер страницы
 * @param pageSize   количество пользователей на странице
 * @param roleId     идентификатор роли, которую должны иметь пользователи
 * @param roleName   название роли, которую должны иметь пользователи
 */
export const getAllUsers = async (
  pageNumber: number = 0,
  pageSize: number = 10,
  roleId: number | null = null,
  roleName: string | null = null) => {
  try {
    let request: string = `http://localhost:8080/api/user?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (roleId) request = request.concat(`&roleId=${roleId}`);
    else if (roleName) request = request.concat(`&roleName=${roleName}`);

    return await axios.get<UserPageResponse>(request);
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
 * Получает аватар пользователя.
 *
 * @param id идентификатор пользователя
 */
export const getUserAvatar = async (id: number) => {
  try {
    return await axios.get<any>(`http://localhost:8080/api/user/${id}/avatar`, {
      responseType: "blob"
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
