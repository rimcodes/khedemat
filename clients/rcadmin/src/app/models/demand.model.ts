import { Service } from "./service.model";
import { User } from "./user.model";

export class Demand {
  id!: string;
  user!: User;
  worker?: User;
  service!: Service;
  title?: string;
  details?: string;
  date?: string;
  address?: string;
  status?: string;
  createdAt!: string;
  updatedAt!: string;
}
