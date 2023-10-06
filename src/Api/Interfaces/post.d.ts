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

export interface PageResponse {
  content: PostResponse[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface PostRequest {
  title: string;
  content: string;
}