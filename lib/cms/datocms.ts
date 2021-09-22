import { fetchAPI } from "./common";

export async function getAllProjects(preview: boolean) {
  const data = await fetchAPI(
    `
    {
      allProjects(filter: { ready: { eq: true } }) {
        id
        title
        description
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
        introduction1
        introduction2
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
