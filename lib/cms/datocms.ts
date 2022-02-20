import { fetchAPI } from "./common";

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
  return data?.allProjects;
}

export async function getAbout(preview) {
  const data = await fetchAPI(
    `
    {
      about {
        name
        title
        location
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
  return data?.about;
}
