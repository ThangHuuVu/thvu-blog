import LoginButton from "@/components/login-button";
import PageTitle from "@/components/PageTitle";
import { InferGetServerSidePropsType } from "next";
import { getProviders, getSession } from "next-auth/react";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <div className="pt-6 pb-4 space-y-2 md:space-y-5">
        <PageTitle>Sign In</PageTitle>
      </div>
      <div className="space-y-2 flex justify-items-center items-center flex-col xl:space-y-0">
        <div className="p-8 prose dark:prose-dark max-w-none">
          <div className="flex gap-4 flex-col justify-between items-center">
            <p className=" text-center sm:text-left">
              To leave a comment, please sign in with one of these providers:
            </p>
            {Object.values(providers).map((provider) => {
              return <LoginButton key={provider.id} provider={provider} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
