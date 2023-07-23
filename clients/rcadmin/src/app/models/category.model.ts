import { User } from "./user.model";

export class Category {
  id!: string;
  // user!: User;
  category?: Category;
  title!: string;
  details!: string;
  active!: boolean;
  image?: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
}
