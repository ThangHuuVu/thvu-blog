import Link from "next/link";
import kebabCase from "@/lib/utils/kebabCase";

const Tag = ({ text }: { text: string }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="mr-3 text-sm font-medium uppercase text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
        {text.split(" ").join("-")}
      </a>
    </Link>
  );
};

export default Tag;
