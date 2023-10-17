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

/**
 * Интерфейс, представляющий объект передачи данных для страницы, содержащей список пользователей.
 */
export interface UserPageResponse {
  content: UserResponse[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}