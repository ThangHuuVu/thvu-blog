import redis from '@/lib/redis'
import Guestbook from '@/components/Guestbook'
import { PageSeo } from '@/components/SEO'
import Link from 'next/link'

export default function GuestbookPage() {
  return (
    <>
      <PageSeo
        title={'Guestbook – Thang Huu Vu'}
        description={'Share some wisdom with my future visitors.'}
        url={'https://thvu.dev/guestbook'}
      />
      <div className="divide-y">
        <div className="flex flex-col justify-center items-start max-w-2xl pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Guestbook
          </h1>
        </div>
        <div className="flex flex-col item-center gap-4 pt-8 pb-8 sm:gap-8">
          <div className="prose dark:prose-dark max-w-none lg:prose-xl">
            <p className="text-gray-600 dark:text-gray-400">
              An artifact of the 90's webs. Leave a comment below for my future blog readers. Feel
              free to write anything!
            </p>
          </div>
          <Guestbook />
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400">
        This page is inspired by{' '}
        <Link href="https://leerob.io/guestbook">
          <a className="text-base font-medium leading-6 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
            Lee Robinson's guestbook.
          </a>
        </Link>
      </p>
    </>
  )
}

export async function getStaticProps() {
  const entries = (await redis.hvals('guestbook'))
    .map((entry) => JSON.parse(entry))
    .sort((a, b) => b.id - a.id)

  return {
    props: {
      initialEntries: entries,
    },
    revalidate: 60,
  }
}
