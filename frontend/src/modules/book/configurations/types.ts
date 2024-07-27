
export type CreateBook = {
  name: string;
  author?: string;
  year?: number;
  genre?: string[];
  description?: string;
};

export type Book = CreateBook & {
  id?: number;
  rating?: number;
};