import { User } from "./skill";

export type GuestBookEntry = {
  id: string;
  body: string;
  created_by: string;
  updated_at: string;
  user: User;
};
