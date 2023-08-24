import { Category } from "./category.model";
import { User } from "./user.model";

export class Service {
  id!: string;
  category!: Category;
  user!: User;
  title!: string;
  price!: number;
  details?: string;
  description?: string;
  isFeatured!: boolean;
  active!: boolean;
  image?: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
}
