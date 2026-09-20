export interface EventItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  location: string;
  starts_at: string;
  ends_at: string | null;
  is_published: boolean;
  is_favorite?: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: PaginationMeta;
}

export interface EventFilterParams {
  title?: string;
  location?: string;
  category?: string;
  is_published?: boolean | number;
  sort?: "title" | "starts_at" | "created_at" | "-title" | "-starts_at" | "-created_at" | string;
  page?: number;
  per_page?: number;
}
