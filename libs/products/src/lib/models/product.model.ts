import { Category } from "./category.model";

export class Product {
  id?: string;
  name?: string;
  description?: string;
  richDescription?: string;
  image?: string;
  images?: String[];
  brand?: string;
  price?: number;
  rating?: number;
  numReviews?: number;
  isFeatured?: boolean;
  category?: Category;
  countInStock?: number;
}
