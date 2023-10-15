/**
 * Интерфейс, представляющий ответ на получение комментария.
 */
export interface CommentResponse {
  id: number;
  userId: number;
  postId: number;
  content: string;
  published: boolean;
  createdAt: number;
  updatedAt: number;
  publishedAt: number;
}

/**
 * Интерфейс, представляющий запрос на создание комментария.
 */
export interface CommentRequest {
  postId: number;
  content: string;
}

/**
 * Интерфейс, представляющий объект передачи данных для страницы, содержащей список комментариев.
 */
export interface CommentPageResponse {
  content: CommentResponse[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}