import React, { useState, useRef } from "react";

import useSWR, { useSWRConfig } from "swr";
import fetcher from "@/lib/fetcher";
import SuccessMessage from "@/components/SuccessMessage";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useSession } from "next-auth/react";
import { GuestBookEntry } from "@/lib/types/guestbook";
import LoginView from "../LoginView";
import Button from "../Button";
import GuestbookEntry from "./GuestbookEntry";
import fireConfetti from "@/lib/utils/confetti";
import { FormState } from "@/lib/types/form";

export default function Guestbook({ fallbackData }: { fallbackData: GuestBookEntry[] }) {
  const [form, setForm] = useState<FormState>(FormState.INITIAL);
  const inputEl = useRef<HTMLTextAreaElement>(null);
  const { data: session } = useSession();
  const { error: entriesError, data: entries } = useSWR<GuestBookEntry[]>(
    "/api/guestbook",
    fetcher,
    {
      fallbackData,
    }
  );
  const { mutate } = useSWRConfig();

  return (
    <>
      <LoginView message="Login to sign the guestbook." />
      {Boolean(session?.user) && (
        <div className="border-2 border-gray-400 dark:border-gray-600 rounded-md p-6 prose dark:prose-dark lg:prose-xl">
          <p>Leave a message!</p>
          <form
            className="w-full my-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setForm(FormState.LOADING);

              const res = await fetch("/api/guestbook", {
                body: JSON.stringify({
                  body: inputEl.current?.value,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
              });

              const { error } = await res.json();
              if (error) {
                setForm(FormState.ERROR);
                return;
              }

              if (inputEl.current) inputEl.current.value = "";
              mutate("/api/guestbook");
              setForm(FormState.SUCCESS);
              fireConfetti();
            }}
          >
            <textarea
              ref={inputEl}
              aria-label="Your message"
              placeholder="Your message..."
              required
              style={{ resize: "none" }}
              className="px-4 py-2 my-4 focus:ring-primary-500 focus:border-primary-500 block w-full border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <Button type="submit">
              {form === FormState.LOADING ? <LoadingSpinner /> : "Sign"}
            </Button>
          </form>
          {form === FormState.ERROR && <ErrorMessage>An error occurred.</ErrorMessage>}
          {form === FormState.SUCCESS && (
            <SuccessMessage>Awesome! Thank you for signing my guestbook.</SuccessMessage>
          )}
        </div>
      )}
      <div className="mt-4 space-y-8">
        {entriesError && (
          <ErrorMessage>
            An unexpected error occurred. The entries are not available for now. Please try again
            later
          </ErrorMessage>
        )}
        {entries ? (
          entries.map((entry) => (
            <GuestbookEntry key={entry.id} entry={entry} currentUserId={session?.id as string} />
          ))
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </>
  );
}
