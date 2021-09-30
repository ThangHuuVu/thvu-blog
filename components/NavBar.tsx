import headerNavLinks from "@/data/headerNavLinks";
import siteMetadata from "@/data/siteMetadata";
import Link from "./Link";
import ThemeSwitch from "./ThemeSwitch";
import { useEffect, useState } from "react";
import MenuButton from "./MenuButton";

function useIsScrollTop() {
  const [isTop, setIsTop] = useState(true);
  useEffect(() => {
    function onScroll() {
      setIsTop(window.scrollY <= 0);
    }
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return isTop;
}
export default function NavBar() {
  const [navShow, setNavShow] = useState(false);
  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = "auto";
      } else {
        // Prevent scrolling
        document.body.style.overflow = "hidden";
      }
      return !status;
    });
  };
  const isTop = useIsScrollTop();

  return (
    <>
      <header className="w-full sticky z-20 top-0 bg-white dark:bg-black bg-opacity-30 dark:bg-opacity-30 backdrop-filter backdrop-saturate-150 backdrop-blur-lg firefox:bg-opacity-100 dark:firefox:bg-opacity-100 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between py-4">
        <nav className="w-full max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0 flex items-center justify-between">
          <div
            style={{ opacity: isTop ? 1 : 0 }}
            className="block sm:h-6 sm:text-2xl font-bold italic hover:text-primary-600 dark:hover:text-primary-400 transition-opacity"
          >
            <Link href="/">{siteMetadata.headerTitle}</Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks
                .filter((l) => !l.onlyMobile)
                .map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    style={{ opacity: isTop ? 1 : 0 }}
                    className="p-1 sm:p-4 font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-opacity"
                  >
                    {link.title}
                  </Link>
                ))}
            </div>
            <ThemeSwitch />
            <div className="sm:hidden flex items-center">
              <MenuButton onClick={onToggleNav} isOpened={navShow} />
            </div>
          </div>
        </nav>
      </header>
      {/* Mobile side menu */}
      <div
        onClick={onToggleNav}
        className={`md:hidden fixed w-full h-screen right-0 bg-white dark:bg-black z-20 transform ease-in-out duration-300 ${
          navShow ? "translate-x-0" : "translate-x-full"
        } backdrop-filter bg-opacity-30 dark:bg-opacity-30 backdrop-saturate-150 backdrop-blur-lg firefox:bg-opacity-100 dark:firefox:bg-opacity-100`}
      >
        <nav className="h-full mt-8">
          {headerNavLinks.map((link) => (
            <div key={link.title} className="px-12 py-4">
              <Link
                href={link.href}
                className="text-2xl font-bold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                onClick={onToggleNav}
              >
                {link.title}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
