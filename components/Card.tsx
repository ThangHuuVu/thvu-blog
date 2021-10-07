import Image from "next/image";
import Link from "@/components/CustomLink";

interface CardProps {
  title: string;
  description: string;
  imgSrc: string;
  href: string;
  tags?: string[];
}

const Card = ({ title, description, imgSrc, href, tags }: CardProps) => (
  <Link
    href={href}
    aria-label={`Link to ${title}`}
    className="p-4 md:w-1/2 md"
    style={{ maxWidth: "544px" }}
    showIcon={false}
  >
    <div className="h-full border-2 border-gray-200 dark:border-gray-800 hover:scale-101 rounded-md overflow-hidden hover:border-primary-600 dark:hover:border-primary-400">
      <Image
        alt={title}
        src={imgSrc}
        className="lg:h-48 md:h-36 object-cover object-center border-b border-solid"
        width={544}
        height={306}
      />
      <div className="p-6">
        <h4 className="text-2xl font-bold leading-8 tracking-tight mb-3 text-black dark:text-white">
          {title}
        </h4>
        <p className="prose text-gray-500 max-w-none dark:text-gray-400 mb-3">{description}</p>
        {tags && (
          <div className="mt-4 text-xs text-gray-700 dark:text-gray-300">{tags.join(" | ")}</div>
        )}
      </div>
    </div>
  </Link>
);

export default Card;
