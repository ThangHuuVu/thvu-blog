import { signIn, getCsrfToken } from "@auth/nextjs/client";
import Line from "./line.svg";
import Google from "./google.svg";
import GoogleDark from "./google-dark.svg";
import Github from "./github.svg";
import GithubDark from "./github-dark.svg";
import { useDarkTheme } from "@/lib/hooks/useDarkTheme";
import { useRouter } from "next/router";
import { useState } from "react";
interface StyleGuide {
  Logo?: any;
  LogoDark?: any;
  bg: string;
  bgDark?: string;
  text: string;
  textDark?: string;
}
const providerStyleGuides: { [key: string]: StyleGuide } = {
  github: {
    Logo: Github,
    LogoDark: GithubDark,
    bg: "bg-black",
    bgDark: "bg-white",
    text: "text-white",
    textDark: "text-black",
  },
  line: {
    Logo: Line,
    bg: "bg-[#00C300]",
    text: "text-white",
  },
  google: {
    Logo: Google,
    LogoDark: GoogleDark,
    bgDark: "bg-[#4285F4]",
    bg: "bg-white",
    text: "text-black",
    textDark: "text-white",
  },
  sendgrid: {
    bg: "bg-black",
    bgDark: "bg-white",
    text: "text-white",
    textDark: "text-black",
  },
};

export default function LoginButton({ provider }: { provider: any }) {
  const [isDark, mounted] = useDarkTheme();
  const [csrf, setCsrf] = useState("");
  const router = useRouter();
  const { callbackUrl } = router.query;
  getCsrfToken().then(setCsrf);

  if (!mounted) return null;
  const { Logo, LogoDark, bg, bgDark, text, textDark } = providerStyleGuides[provider.id];

  if (provider.type === "email")
    return (
      <form action={provider.signinUrl} method="POST" key={provider.name}>
        <input
          className="w-full h-12 mb-4 pl-2 rounded-lg text-slate-700 dark:text-slate-300 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
          placeholder="Your email"
          type="email"
          required
          id="email"
          name="email"
        ></input>
        <input type="hidden" name="csrfToken" value={csrf} />
        <button
          className={`w-56 h-12 flex items-center justify-center gap-3 text-sm font-medium leading-5 transition-colors duration-150 border border-transparent rounded-lg shadow focus:outline-none focus:shadow-outline-primary
          ${isDark && bgDark ? bgDark : bg}
          ${isDark && textDark ? textDark : text} `}
          type="submit"
        >
          Sign in with Email
        </button>
      </form>
    );

  return (
    <div key={provider.name}>
      <button
        className={`w-56 h-12 flex items-center gap-3 text-sm font-medium leading-5 transition-colors duration-150 border border-transparent rounded-lg shadow focus:outline-none focus:shadow-outline-primary
          ${isDark && bgDark ? bgDark : bg}
          ${isDark && textDark ? textDark : text} `}
        onClick={() => signIn(provider.id, { callbackUrl: callbackUrl as string })}
      >
        {isDark && LogoDark ? <LogoDark className="h-full p-2" /> : <Logo className="h-full p-2" />}
        Sign in with {provider.name}
      </button>
    </div>
  );
}
