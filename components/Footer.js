import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import NowPlaying from '@/components/NowPlaying'

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-center mt-16">
        <div className="flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link
            className="text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-100"
            href="/"
          >
            {siteMetadata.title}
          </Link>
        </div>
        <NowPlaying />
        <div className="mb-4 text-sm">
          <Link
            className="text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-100"
            href="https://github.com/timlrx/tailwind-nextjs-starter-blog"
          >
            Tailwind Nextjs Theme
          </Link>
        </div>
      </div>
    </footer>
  )
}
