/**
 * Интерфейс, представляющий ответ на получение поста.
 */
export interface PostResponse {
  id: number;
  userId: number;
  title: string;
  content: string;
  published: boolean;
  createdAt: number;
  updatedAt: number;
  publishedAt: number;
}

/**
 * Интерфейс, представляющий объект передачи данных для страницы, содержащей список постов.
 */
export interface PostPageResponse {
  content: PostResponse[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

/**
 * Интерфейс, представляющий запрос на создание поста.
 */
export interface CreatePostRequest {
  title: string;
  content: string;
  image: File | null;
}

/**
 * Интерфейс, представляющий запрос на обновление поста.
 */
export interface UpdatePostRequest {
  title: string;
  content: string;
}