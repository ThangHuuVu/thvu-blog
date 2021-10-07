import { User } from "./User";

export type Skill = {
  id: string;
  name: string;
  users: User[];
};

export type SkillCategory = {
  name: string;
  skills: Skill[];
};
