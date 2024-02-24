"use client";

import { Skill } from "@/lib/types/skill";
import ButtonIcon from "./plus-square-outline.svg";
import DoneIcon from "./checkmark-circle-outline.svg";
import DefaultAvatar from "../Guestbook/person-outline.svg";
import Image from "next/image";
import type { DefaultSession } from "next-auth";
import { giveEndorsement } from "./actions";
import { useFormState } from "react-dom";

interface Props {
  skill: Skill;
  user: DefaultSession["user"];
  currentUserId: string;
}

export default function Badge({ skill, user, currentUserId }: Props) {
  const [state, formAction] = useFormState(giveEndorsement, {
    message: "",
  });
  const isUserEndorsed = skill?.users?.find((u) => u.id === currentUserId);

  return (
    <div className="space-y-4">
      <form action={formAction} className="flex items-center text-base font-semibold">
        <input type="hidden" name="skillId" value={skill.id} />
        {isUserEndorsed ? (
          <button
            className="font-semibold disabled:hover:cursor-not-allowed text-success-700 dark:text-success-400"
            title="You already endorsed this skill!"
            disabled
          >
            <DoneIcon className="inline w-8 h-8 fill-current " />
          </button>
        ) : (
          <button
            className="font-semibold disabled:hover:cursor-not-allowed text-primary-600 dark:text-primary-400 hover:text-gray-700 dark:hover:text-gray-300 disabled:text-gray-700 dark:disabled:text-gray-300 "
            disabled={!Boolean(user)}
            type="submit"
            title={!Boolean(user) ? "Please login first." : "Endorse this skill!"}
          >
            <ButtonIcon className="inline w-8 h-8 fill-current " />
          </button>
        )}
        <span className="ml-2">{skill.name}</span>
      </form>
      <div className="flex items-center gap-1 flex-wrap">
        {skill.users.map((user) => (
          <span title={user.name} key={user.id} className="w-8 h-8">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name}
                width={32}
                height={32}
                className="rounded-full"
                style={{
                  margin: "0",
                }}
              />
            ) : (
              <DefaultAvatar className="w-8 h-8 p-0.5 rounded-full fill-current text-primary-600 dark:text-primary-400 border-2 border-solid border-primary-600 dark:border-primary-400" />
            )}
          </span>
        ))}
      </div>
      {skill.users.length > 0 && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong className="text-black dark:text-white">{skill.users.length}</strong>{" "}
          {`${skill.name} endorsement${skill.users.length > 1 ? "s" : ""} from:`}
          <span className="mx-2">{skill.users.map((u) => u.name).join(", ")}</span>
        </p>
      )}
    </div>
  );
}
