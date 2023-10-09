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

export interface CommentRequest {
  postId: number;
  content: string;
}

export interface CommentPageResponse {
  content: CommentResponse[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}