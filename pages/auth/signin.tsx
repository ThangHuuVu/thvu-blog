import LoginButton from "@/components/LoginButton";
import PageTitle from "@/components/PageTitle";
import { InferGetServerSidePropsType } from "next";
import { getProviders } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (router.query.error) {
      setIsOpen(true);
    }
  }, [router]);
  return (
    <>
      <div className="pt-6 pb-4 space-y-2 md:space-y-5">
        <PageTitle>Sign In</PageTitle>
      </div>
      <div className="flex flex-col items-center space-y-2 justify-items-center xl:space-y-0">
        <div className="p-8 prose dark:prose-dark max-w-none">
          <div className="flex flex-col items-center justify-between gap-4">
            <p className="text-center sm:text-left">Sign in with one of these providers:</p>
            {Object.values(providers).map((provider) => {
              return <LoginButton key={provider.id} provider={provider} />;
            })}
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Problem signing in
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    An unexpected problem occurred while I'm trying to log you in. Please try with
                    another providers.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md text-success-900 bg-success-100 hover:bg-success-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-success-500"
                    onClick={() => setIsOpen(false)}
                  >
                    OK
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context, authOptions);
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
