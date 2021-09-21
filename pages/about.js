import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { PageSeo } from '@/components/SEO'
import Image from 'next/image'
import { getAbout } from '@/lib/cms/datocms'

export default function About({ about }) {
  const { name, title, location, introduction1, introduction2, profilepicture } = about

  return (
    <>
      <PageSeo
        title={`About - ${siteMetadata.author}`}
        description={`About me - ${siteMetadata.author}`}
        url={`${siteMetadata.siteUrl}/about`}
      />
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          About
        </h1>
      </div>
      <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <div className="flex flex-col items-center pt-8 space-x-2">
          <Image
            src={profilepicture.url}
            width={192}
            height={192}
            alt={profilepicture.alt}
            className="rounded-full"
            placeholder="blur"
            blurDataURL={profilepicture.blurUpThumb}
          />
          <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
          <div className="text-gray-500 dark:text-gray-400">{title}</div>
          <div className="text-gray-500 dark:text-gray-400">
            <span role="img" aria-label="location">
              📍
            </span>
            {location}
          </div>
          <div className="flex pt-6 space-x-3">
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} />
            <SocialIcon kind="github" href={siteMetadata.github} />
            <SocialIcon kind="codepen" href={siteMetadata.codepen} />
            <SocialIcon kind="twitter" href={siteMetadata.twitter} />
          </div>
        </div>
        <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">
          <p>{introduction1}</p>
          <p>{introduction2}</p>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const about = (await getAbout(preview)) || []

  return {
    props: { about },
    revalidate: 60,
  }
}
