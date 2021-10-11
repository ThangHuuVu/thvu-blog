import { User } from "./user";

export type Skill = {
  id: string;
  name: string;
  users: User[];
};

export type SkillCategory = {
  name: string;
  skills: Skill[];
};
