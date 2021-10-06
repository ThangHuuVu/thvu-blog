import Link from "./Link";
import siteMetadata from "@/data/siteMetadata";
import NowPlaying from "@/components/NowPlaying";

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-center pb-8">
        <nav className="w-full max-w-2xl xl:max-w-3xl flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between mx-auto mt-4 pb-8">
          <div className="flex flex-col space-y-4 md:items-start">
            <p className="text-sm font-bold">Portfolio</p>
            <Link className="text-sm hover:text-primary-600 dark:hover:text-primary-400" href="/">
              Home
            </Link>
            <Link
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
              href="/about"
            >
              About
            </Link>
          </div>
          <div className="flex flex-col space-y-4 md:items-start">
            <p className="text-sm font-bold">Writing</p>
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
            <Link
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
              href="/notes"
            >
              Notes
            </Link>
          </div>
          <div className="flex flex-col space-y-4 md:items-start">
            <p className="text-sm font-bold">Showcase</p>
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
          </div>
          <div className="flex flex-col space-y-4 md:items-start">
            <p className="text-sm font-bold">Social</p>
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
        </nav>
        <NowPlaying />
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
      </div>
    </footer>
  );
}
