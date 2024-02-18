import { Suspense } from "react";
import LoginButton from "@/components/LoginButton";
import PageTitle from "@/components/PageTitle";
import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import CustomLink from "@/components/CustomLink";
import { SignInError } from "@/components/SignInError";
import { authConfig, signIn } from "auth";

export default function SignIn() {
  const providers = authConfig.providers.map((provider) => ({
    id: (provider as any).id,
    name: provider.name,
  }));

  return (
    <Suspense>
      <PageSEO
        title={`Sign In - ${siteMetadata.author}`}
        description={`Sign In - ${siteMetadata.author}`}
      />
      <div className="pt-6 pb-4 space-y-2 md:space-y-5">
        <PageTitle>Sign In</PageTitle>
      </div>
      <div className="flex flex-col items-center space-y-2 justify-items-center xl:space-y-0">
        <div className="p-8 prose dark:prose-dark max-w-none">
          <div className="flex flex-col items-center justify-between gap-4">
            <p className="text-center sm:text-left">Sign in with one of these providers:</p>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <LoginButton
                    key={provider.id}
                    provider={provider}
                    signInAction={async () => {
                      "use server";
                      await signIn(provider.id, { redirectTo: "/endorsements" });
                    }}
                  />
                );
              })}
            <p className="text-center sm:text-left">
              Authentication built with 💚 using{" "}
              <CustomLink href="https://authjs.dev/">NextAuth.js</CustomLink>
            </p>
          </div>
        </div>
      </div>
      <SignInError />
    </Suspense>
  );
}
