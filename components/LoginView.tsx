import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import CustomLink from "./Link";

interface Props {
  message: string;
}

function LogoutButton() {
  return (
    <CustomLink
      className="font-semibold"
      href="/api/auth/signout"
      onClick={(e) => {
        e.preventDefault();
        signOut();
      }}
    >
      Log out
    </CustomLink>
  );
}

export default function LoginView({ message }: Props) {
  const { data: session } = useSession();

  return (
    <div className="prose dark:prose-dark lg:prose-xl">
      {Boolean(session?.user) ? (
        <div>
          Logged in as <strong>{session.user.name}.</strong> <LogoutButton />
        </div>
      ) : (
        <div className="mb-10 border-2 border-blue-200 dark:border-blue-800 rounded-md p-6">
          <h5 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
            {message}
          </h5>
          <button
            className="px-4 py-2 flex items-center justify-center my-4 font-semibold text-base bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            onClick={() => {
              signIn();
            }}
          >
            Login
          </button>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Your information is only used to display your name and reply by email.
          </p>
        </div>
      )}
    </div>
  );
}
