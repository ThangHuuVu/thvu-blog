// Icons taken from: https://simpleicons.org/
import Mail from "./mail.svg";
import Github from "./github.svg";
import Linkedin from "./linkedin.svg";
import Twitter from "./twitter.svg";
import Codepen from "./codepen.svg";

interface ComponentProps {
  [kind: string]: any;
}
const components: { [kind: string]: any } = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  codepen: Codepen,
};

interface Props {
  kind: keyof ComponentProps;
  href: string;
  size?: number;
}

const SocialIcon = ({ kind, href, size = 8 }: Props) => {
  if (!href) return null;

  const SocialSvg = components[kind];

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 h-${size} w-${size}`}
      />
    </a>
  );
};

export default SocialIcon;
