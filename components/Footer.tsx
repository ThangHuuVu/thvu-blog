import siteMetadata from "@/data/siteMetadata";

export default function Footer() {
  return (
    <footer>
      <div className="w-full text-sm text-gray-500 dark:text-gray-400 pb-8">
        <span>{`All work © ${new Date().getFullYear()} `}</span>
        <span className="text-black dark:text-white">{siteMetadata.author}</span>
        <span> unless otherwise noted</span>
      </div>
    </footer>
  );
}
