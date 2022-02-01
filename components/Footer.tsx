import CustomLink from "./CustomLink";
import siteMetadata from "@/data/siteMetadata";
import NowPlaying from "@/components/NowPlaying";
import ThemeSwitch from "./ThemeSwitch";

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-center pb-8">
        <nav className="flex flex-col justify-between w-full max-w-2xl gap-4 pb-8 mx-auto mt-4 xl:max-w-3xl sm:gap-0 sm:flex-row">
          <div className="flex flex-col space-y-4 md:items-start">
            <p className="text-sm font-bold">Portfolio</p>
            <CustomLink
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
              href="/"
            >
              Home
            </CustomLink>
            <CustomLink
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
              href="/about"
            >
              About
            </CustomLink>
            <CustomLink
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
              href="/projects"
            >
              Projects
            </CustomLink>
          </div>
          <div className="flex flex-col space-y-4 md:items-start">
            <p className="text-sm font-bold">Writing</p>
            <CustomLink
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
              href="/blog"
            >
              Blog
            </CustomLink>
            <CustomLink
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
              href="/tags"
            >
              Tags
            </CustomLink>
            <CustomLink
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
              href="/notes"
            >
              Notes
            </CustomLink>
          </div>
          <div className="flex flex-col space-y-4 md:items-start">
            <p className="text-sm font-bold">Showcase</p>
            <CustomLink
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
              href="/endorsements"
            >
              Endorsements
            </CustomLink>
            <CustomLink
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
              href="/guestbook"
            >
              Guestbook
            </CustomLink>
          </div>
          <div className="flex flex-col space-y-4 md:items-start">
            <p className="text-sm font-bold">Social</p>
            <CustomLink
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
              href={siteMetadata.twitter}
            >
              Twitter
            </CustomLink>
            <CustomLink
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
              href={siteMetadata.github}
            >
              GitHub
            </CustomLink>
            <CustomLink
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
              href={siteMetadata.codepen}
            >
              CodePen
            </CustomLink>
            <CustomLink
              className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
              href={siteMetadata.linkedin}
            >
              LinkedIn
            </CustomLink>
          </div>
        </nav>
        <div className="flex justify-between w-full">
          <div className="w-full truncate">
            <NowPlaying />
            <div className="flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <div>Copyright</div>
              <div>{`© ${new Date().getFullYear()}`}</div>
              <CustomLink
                className="text-black dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
                href="/"
              >
                {siteMetadata.title}
              </CustomLink>
            </div>
          </div>
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  );
}
