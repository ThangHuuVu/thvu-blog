import { signIn, signOut, useSession } from "next-auth/react";
import CustomLink from "./CustomLink";
import Button from "./Button";

interface Props {
  message: string;
}

export default function LoginView({ message }: Props) {
  const { data: session } = useSession();

  return (
    <div className="prose dark:prose-dark lg:prose-xl">
      {!!session?.user ? (
        <div className="text-lg text-gray-500 dark:text-gray-400 xl:text-xl">
          Logged in as <strong>{session.user.name}.</strong>{" "}
          <CustomLink
            className="font-semibold"
            href="/api/auth/signout"
            onClick={async (e) => {
              e.preventDefault();
              await signOut();
            }}
          >
            Log out
          </CustomLink>
        </div>
      ) : (
        <div className="mb-10 border-2 border-gray-400 dark:border-gray-600 rounded-md p-6">
          <h5 className="text-2xl font-bold leading-8 tracking-tight">{message}</h5>
          <Button onClick={() => signIn()}>Login</Button>
          <p className="text-lg text-gray-500 dark:text-gray-400 xl:text-xl">
            Your information is only used to display your name and profile picture.
          </p>
        </div>
      )}
    </div>
  );
}
