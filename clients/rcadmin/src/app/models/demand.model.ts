import { Service } from "./service.model";
import { User } from "./user.model";

export class Demand {
  id!: string;
  service!: Service;
  user!: User;
  worker?: User;
  details?: string;
  date?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}
