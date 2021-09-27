export type Skill = {
  id: string;
  name: string;
  people: string[];
};

export type SkillCategory = {
  name: string;
  skills: Skill[];
};
