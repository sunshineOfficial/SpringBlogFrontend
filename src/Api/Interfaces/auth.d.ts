/**
 * Интерфейс, представляющий запрос на вход в систему.
 */
export interface LoginRequest {
  username: string;
  password: string;
}

/**
 * Интерфейс, представляющий ответ на вход в систему.
 */
export interface LoginResponse {
  accessToken: string;
  tokenType: string;
}

/**
 * Интерфейс, представляющий запрос на регистрацию пользователя.
 */
export interface RegisterRequest {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}