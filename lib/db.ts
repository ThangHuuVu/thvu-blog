import { getAllFilesFrontMatter } from "./mdx";
import prisma from "./prisma";
import { GuestBookEntry } from "./types/guestbook";
import { Skill, SkillCategory } from "./types/skill";
import { User } from "./types/user";

export async function getAllBlogPosts() {
  try {
    const posts = await getAllFilesFrontMatter("blog");
    const viewCountBySlug = (await prisma.view.findMany()).reduce((obj, view) => {
      obj[view.slug] = view.count.toString();
      return obj;
    }, {});

    posts.forEach((post) => (post.viewCount = viewCountBySlug[post.slug] || "0"));

    return posts;
  } catch (error) {
    console.error("Error getting blogs: ", error);
    return [];
  }
}

export async function getAllSkillsByCategory() {
  try {
    const skillsByCategory = await prisma.skillCategory.findMany({
      include: {
        skills_in_category: {
          include: {
            endorsements: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    return skillsByCategory.map<SkillCategory>((category) => ({
      name: category.name,
      skills: category.skills_in_category.map<Skill>((skill) => ({
        id: skill.id.toString(),
        name: skill.name,
        users: skill.endorsements
          .filter((en) => en.userId)
          .map<User>((en) => ({
            id: en.user.id,
            name: en.user.name,
            image: en.user.image,
          })),
      })),
    }));
  } catch (error) {
    console.error("Error getting skills: ", error);
    return [];
  }
}

export async function getGuestbookEntries() {
  try {
    const entries = await prisma.guestbook.findMany({
      orderBy: {
        updated_at: "desc",
      },
      select: { id: true, body: true, updated_at: true, user: true },
    });

    return entries.map<GuestBookEntry>((entry) => ({
      id: entry.id.toString(),
      body: entry.body,
      updated_at: entry.updated_at.toString(),
      user: {
        id: entry.user.id,
        name: entry.user.name,
        image: entry.user.image,
      },
    }));
  } catch (error) {
    console.error("Error getting guestbook entries: ", error);
    return [];
  }
}
