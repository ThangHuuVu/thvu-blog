import Link from "./Link";
import siteMetadata from "@/data/siteMetadata";
import NowPlaying from "@/components/NowPlaying";

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-center">
        <div className="flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>Copyright</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>-</div>
          <Link
            className="text-black dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
            href="/"
          >
            {siteMetadata.title}
          </Link>
        </div>
        <NowPlaying />
        <div className="w-full max-w-xl grid grid-cols-1 gap-4 pb-4 sm:grid-cols-3 mx-auto mt-4">
          <div className="flex flex-col space-y-4 md:items-center">
            <Link className="text-sm hover:text-primary-600 dark:hover:text-primary-400" href="/">
              Home
            </Link>
            <Link
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
              href="/about"
            >
              About
            </Link>
            <Link
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
              href="/blog"
            >
              Blog
            </Link>
            <Link
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
              href="/tags"
            >
              Tags
            </Link>
          </div>
          <div className="flex flex-col space-y-4 md:items-center">
            <Link
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
              href="/projects"
            >
              Projects
            </Link>
            <Link
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
              href="/endorsements"
            >
              Endorsements
            </Link>
            <Link
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
              href="/guestbook"
            >
              Guestbook
            </Link>
            <Link
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
              href="/notes"
            >
              Notes
            </Link>
          </div>
          <div className="flex flex-col space-y-4 md:items-center">
            <Link
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
              href={siteMetadata.twitter}
            >
              Twitter
            </Link>
            <Link
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
              href={siteMetadata.github}
            >
              GitHub
            </Link>
            <Link
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
              href={siteMetadata.codepen}
            >
              CodePen
            </Link>
            <Link
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
              href={siteMetadata.linkedin}
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
