import { signIn, signOut, useSession } from "next-auth/react";
import CustomLink from "./CustomLink";

interface Props {
  message: string;
}

export default function LoginView({ message }: Props) {
  const { data: session } = useSession();

  return (
    <div>
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
          <h2 className="text-2xl font-bold leading-8 tracking-tight">{message}</h2>
          <button
            className="px-4 py-2 flex items-center justify-center my-4 font-semibold text-lg text-white bg-primary-400 dark:bg-primary-600 hover:bg-primary-500 dark:hover:bg-primary-500 rounded"
            onClick={() => signIn()}
          >
            Login
          </button>
          <p className="text-lg text-gray-500 dark:text-gray-400 xl:text-xl">
            Your information is only used to display your name and profile picture.
          </p>
        </div>
      )}
    </div>
  );
}
