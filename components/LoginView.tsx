import { auth, signOut } from "auth";
import CustomLink from "./CustomLink";

export default async function LoginView() {
  const session = await auth();

  return (
    <div>
      {!!session?.user ? (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
          className="text-lg text-gray-500 dark:text-gray-400 xl:text-xl"
        >
          Logged in as <strong>{session.user.name}.</strong>{" "}
          <button
            type="submit"
            className="px-4 py-2 flex items-center justify-center my-4 font-semibold text-lg text-white bg-primary-400 dark:bg-primary-600 hover:bg-primary-500 dark:hover:bg-primary-500 rounded"
          >
            Log out
          </button>
        </form>
      ) : (
        <div className="mb-10 border-2 border-gray-400 dark:border-gray-600 rounded-md p-6">
          <h2 className="text-2xl font-bold leading-8 tracking-tight">
            <CustomLink
              href="/auth/signin"
              className="w-fit inline-block px-4 py-2 font-semibold text-lg !text-white !no-underline bg-primary-400 dark:bg-primary-600 hover:bg-primary-500 dark:hover:bg-primary-500 rounded"
            >
              Sign In
            </CustomLink>{" "}
            to give endorsements
          </h2>

          <p className="text-lg text-gray-500 dark:text-gray-400 xl:text-xl">
            Your information is only used to display your name and profile picture.
          </p>
        </div>
      )}
    </div>
  );
}
