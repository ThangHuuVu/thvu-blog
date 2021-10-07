import { User } from "./User";

export type GuestBookEntry = {
  id: string;
  body: string;
  updated_at: string;
  user: User;
};
