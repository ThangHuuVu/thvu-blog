import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import CustomLink from "./Link";
import Button from "./Button";

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
const onSignIn = () => {
  signIn();
};

export default function LoginView({ message }: Props) {
  const { data: session } = useSession();

  return (
    <div className="prose dark:prose-dark lg:prose-xl">
      {Boolean(session?.user) ? (
        <div>
          Logged in as <strong>{session.user.name}.</strong> <LogoutButton />
        </div>
      ) : (
        <div className="mb-10 border-2 border-gray-400 dark:border-gray-600 rounded-md p-6">
          <h5 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
            {message}
          </h5>
          <Button onClick={onSignIn}>Login</Button>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Your information is only used to display your name and reply by email.
          </p>
        </div>
      )}
    </div>
  );
}
