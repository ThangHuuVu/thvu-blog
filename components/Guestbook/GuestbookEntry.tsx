"use client";

import Image from "next/image";
import { format } from "date-fns";
import DefaultAvatar from "./person-outline.svg";
import { GuestBookEntry } from "@/lib/types/guestbook";
import { useFormState, useFormStatus } from "react-dom";
import { deleteEntry } from "./actions";

interface GuestbookEntryProps {
  entry: GuestBookEntry;
  currentUserId: string;
}

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="ml-2 text-sm text-danger-600 dark:text-danger-400"
      aria-disabled={pending}
    >
      Delete
    </button>
  );
}

export default function GuestbookEntry({ entry, currentUserId }: GuestbookEntryProps) {
  const { user, body, updated_at } = entry;
  const [state, formAction] = useFormState(deleteEntry, { message: "" });

  return (
    <>
      <div className="flex flex-col space-y-2 not-prose">
        <div className="text-gray-700 max-w-none dark:text-gray-300">{body}</div>
        <div className="flex items-center space-x-3">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={20}
              height={20}
              className="rounded-full"
            />
          ) : (
            <DefaultAvatar className="w-5 h-5 rounded-full fill-current text-primary-600 dark:text-primary-400" />
          )}

          <p className="text-sm text-gray-500">{entry.user.name}</p>
          <span className=" text-gray-300 dark:text-gray-700">/</span>
          <p className="text-sm text-gray-300 dark:text-gray-700">
            {format(new Date(updated_at), "d MMM yyyy 'at' h:mm bb")}
          </p>
          {currentUserId === user.id && (
            <form action={formAction}>
              <input type="hidden" name="id" value={entry.id} />
              <span className="text-gray-300 dark:text-gray-700">/</span>
              <DeleteButton />
              <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
