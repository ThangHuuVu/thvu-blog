import { Container } from '@/lib/types/common';

export default function SectionContainer({ children }: Container) {
  return <div className="max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0">{children}</div>;
}
