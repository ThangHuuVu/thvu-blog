import { fetchAPI } from './common'

export async function getAllProjects(preview) {
  const data = await fetchAPI(
    `
    {
      allProjects {
        id
        title
        description
        url
        imagesrc
      }
    }
  `,
    { preview }
  )
  return data?.allProjects
}
