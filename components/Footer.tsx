import Link from "./Link";
import siteMetadata from "@/data/siteMetadata";
import NowPlaying from "@/components/NowPlaying";

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-center">
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
        <div className="w-full max-w-xl grid grid-cols-1 gap-4 pb-4 sm:grid-cols-3 mx-auto mt-4">
          <div className="flex flex-col space-y-4 md:items-center">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-100"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-100"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-100"
            >
              Blog
            </Link>
            <Link
              href="/tags"
              className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-100"
            >
              Tags
            </Link>
          </div>
          <div className="flex flex-col space-y-4 md:items-center">
            <Link
              href="/projects"
              className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-100"
            >
              Projects
            </Link>
            <Link
              href="/endorsements"
              className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-100"
            >
              Endorsements
            </Link>
            <Link
              href="/guestbook"
              className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-100"
            >
              Guestbook
            </Link>
            <Link
              href="/notes"
              className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-100"
            >
              Notes
            </Link>
          </div>
          <div className="flex flex-col space-y-4 md:items-center">
            <Link
              href={siteMetadata.twitter}
              className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-100"
            >
              Twitter
            </Link>
            <Link
              href={siteMetadata.github}
              className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-100"
            >
              GitHub
            </Link>
            <Link
              href={siteMetadata.codepen}
              className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-100"
            >
              CodePen
            </Link>
            <Link
              href={siteMetadata.linkedin}
              className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-100"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
