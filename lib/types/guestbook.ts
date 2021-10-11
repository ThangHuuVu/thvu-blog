import { User } from "./user";

export type GuestBookEntry = {
  id: string;
  body: string;
  updated_at: string;
  user: User;
};
