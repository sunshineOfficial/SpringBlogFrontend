/**
 * Интерфейс, представляющий ответ на получение пользователя.
 */
export interface UserResponse {
  id: number;
  roleId: number;
  username: string;
  firstName: string;
  lastName: string;
}