import { Promotion } from "./promotion.model";
import { Service } from "./service.model";

export class User {
  id!: string;
  username!: string;
  password?: string;
  role!: string;
  active!: boolean;
  phone?: string;
  address?: string;
  profile?: string;
  cords?: string;
  images?: string[];
  promos?: Promotion[];
  services?: string[];
  createdAt!: string;
  updatedAt!: string;
}
