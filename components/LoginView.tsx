import { signIn, signOut, useSession } from "next-auth/react";
import CustomLink from "./CustomLink";
import Button from "./Button";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  message: string;
}

export default function LoginView({ message }: Props) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>();
  const onSignIn = async () => {
    setIsLoading(true);
    await signIn();
    setIsLoading(false);
  };

  return (
    <div className="prose dark:prose-dark lg:prose-xl">
      {Boolean(session?.user) ? (
        <div>
          Logged in as <strong>{session.user.name}.</strong>{" "}
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <CustomLink
              className="font-semibold"
              href="/api/auth/signout"
              onClick={async (e) => {
                e.preventDefault();
                setIsLoading(true);
                await signOut();
                setIsLoading(false);
              }}
            >
              Log out
            </CustomLink>
          )}
        </div>
      ) : (
        <div className="mb-10 border-2 border-gray-400 dark:border-gray-600 rounded-md p-6">
          <h5 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
            {message}
          </h5>
          <Button onClick={onSignIn}>{isLoading ? <LoadingSpinner /> : "Login"}</Button>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Your information is only used to display your name and profile picture.
          </p>
        </div>
      )}
    </div>
  );
}
