import { fetchAPI } from "./common";

export interface Project {
  id: string;
  title: string;
  description: string;
  projectType: "sideGig" | "hobby" | "product" | "oss";
  ready: boolean;
  url: string;
  cover: {
    url: string;
  };
}

export async function getAllProjects(preview: boolean) {
  const data = await fetchAPI(
    `
    {
      allProjects {
        id
        title
        description
        projectType
        ready
        url
        cover {
          url
        }
      }
    }
  `,
    { preview }
  );
  return data?.allProjects as Project[];
}

export interface About {
  name: string;
  title: string;
  updatedAt: string;
  content: any;
  profilepicture: {
    blurhash: string;
    alt: string;
    url: string;
    blurUpThumb: string;
  };
}

export async function getAbout(preview: boolean) {
  const data = await fetchAPI(
    `
    {
      about {
        name
        title
        updatedAt
        content {
          value
        }
        profilepicture {
          blurhash
          alt
          url
          blurUpThumb
        }
      }
    }
  `,
    { preview }
  );
  return data?.about as About;
}
