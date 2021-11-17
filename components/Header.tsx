import headerNavLinks from "@/data/headerNavLinks";
import Link from "./CustomLink";
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

function useToggleMenu() {
  const [menuShow, setMenuShow] = useState(false);
  const onMenuToggle = () => {
    setMenuShow((status) => {
      if (status) {
        document.body.style.overflow = "auto";
      } else {
        // Prevent scrolling
        document.body.style.overflow = "hidden";
      }
      return !status;
    });
  };
  return [menuShow, onMenuToggle] as const;
}

export default function Header() {
  const [menuShow, onMenuToggle] = useToggleMenu();
  const isTop = useIsScrollTop();

  return (
    <>
      <header
        className={`w-full sticky z-20 top-0 flex items-center justify-between py-4  ${
          isTop ? "border-none" : "border-b border-gray-200 dark:border-gray-800"
        } bg-white dark:bg-black bg-opacity-30 dark:bg-opacity-30 backdrop-filter backdrop-saturate-150 backdrop-blur-lg firefox:bg-opacity-100 dark:firefox:bg-opacity-100`}
      >
        <nav className="flex items-center justify-between w-full max-w-2xl px-4 mx-auto sm:px-6 sm:py-2 xl:max-w-3xl xl:px-0">
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block sm:space-x-8">
              {headerNavLinks
                .filter((l) => !l.onlyMobile)
                .map((link) => (
                  <Link
                    key={link.title}
                    title={link.title}
                    href={link.href}
                    className="font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                  >
                    {link.title}
                  </Link>
                ))}
            </div>
            <div className="flex items-center sm:hidden">
              <MenuButton onClick={onMenuToggle} isOpened={menuShow} />
            </div>
          </div>
        </nav>
      </header>
      {/* Mobile side menu */}
      <div
        className={`sm:hidden fixed w-full h-screen right-0 bg-white dark:bg-black z-20 transform ease-in-out duration-500 ${
          menuShow ? "translate-x-0" : " -translate-x-full"
        } backdrop-filter bg-opacity-30 dark:bg-opacity-30 backdrop-saturate-150 backdrop-blur-lg firefox:bg-opacity-100 dark:firefox:bg-opacity-100`}
      >
        <nav className="h-full mt-8 space-y-8">
          {headerNavLinks.map((link) => (
            <div key={link.title} className="px-12">
              <Link
                href={link.href}
                title={link.title}
                className="text-xl font-semibold leading-8 tracking-wide text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                onClick={onMenuToggle}
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
