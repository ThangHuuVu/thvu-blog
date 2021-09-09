import siteMetadata from '@/data/siteMetadata'
import Card from '@/components/Card'
import { PageSeo } from '@/components/SEO'
import { getAllProjects } from '@/lib/cms/datocms'

export default function Projects({ allProjects }) {
  return (
    <>
      <PageSeo
        title={`Projects - ${siteMetadata.author}`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/projects`}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Projects I built in my free time for my hobbies or personal needs.
          </p>
        </div>
        <div className="container py-12">
          <div className="flex flex-wrap -m-4">
            {allProjects.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imagesrc}
                href={d.url}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allProjects = (await getAllProjects(preview)) || []

  return {
    props: { allProjects },
  }
}
