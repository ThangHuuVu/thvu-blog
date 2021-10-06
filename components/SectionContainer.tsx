import { Container } from "@/lib/types/common";

export default function SectionContainer({ children }: Container) {
  return (
    <div className="max-w-2xl px-4 mx-auto sm:px-6 xl:max-w-3xl xl:px-0 flex flex-col gap-10 sm:gap-14">
      {children}
    </div>
  );
}
