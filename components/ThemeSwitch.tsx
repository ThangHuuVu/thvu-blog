import { useDarkTheme } from "@/lib/hooks/useDarkTheme";
import { Switch } from "@headlessui/react";

const ThemeSwitch = () => {
  const [isDark, mounted, setTheme] = useDarkTheme();
  return (
    <div className="flex items-center w-12 h-6">
      {mounted && (
        <Switch
          checked={isDark}
          title="Theme switch"
          onChange={() => setTheme(isDark ? "light" : "dark")}
          className={`${isDark ? "bg-gray-700" : "bg-gray-300"}
          relative inline-flex shrink-0 h-6 w-12 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Use setting</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`${
              isDark ? "translate-x-6" : "translate-x-0"
            } border-2 border-transparent absolute h-6 w-6 text-gray-900 dark:text-gray-100 transition ease-in-out duration-200`}
          >
            {isDark ? (
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            ) : (
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            )}
          </svg>
          <span
            aria-hidden="true"
            className={`${
              isDark ? "translate-x-0 " : "translate-x-6"
            } bg-gray-100 pointer-events-none inline-block h-6 w-6 rounded-full shadow-lg transform ring-0 transition ease-in-out duration-200  `}
          ></span>
        </Switch>
      )}
    </div>
  );
};

export default ThemeSwitch;
