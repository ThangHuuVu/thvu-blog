import Image from "next/image";
import { format } from "date-fns";
import DefaultAvatar from "./person-outline.svg";
import { useState } from "react";
import { GuestBookEntry } from "@/lib/types/guestbook";
import { mutate } from "swr";
import LoadingSpinner from "@/components/LoadingSpinner";

interface GuestbookEntryProps {
  entry: GuestBookEntry;
  currentUserId: string;
}

export default function Entry({ entry, currentUserId }: GuestbookEntryProps) {
  const { user, body, updated_at } = entry;
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteEntry = async (e) => {
    e.preventDefault();
    setIsDeleting(true);

    await fetch(`/api/guestbook/${entry.id}`, {
      method: "DELETE",
    });

    mutate("/api/guestbook");
  };

  return (
    <>
      {isDeleting ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col space-y-2">
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
              <>
                <span className="text-gray-300 dark:text-gray-700">/</span>
                <button
                  className="text-sm text-danger-600 dark:text-danger-400"
                  onClick={deleteEntry}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
