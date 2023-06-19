export type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  minPrice?: string;
  maxPrice?: string;
  location?: string;
};
