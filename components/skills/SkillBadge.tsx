import React, { useState } from "react";
import { mutate } from "swr";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";
import { Skill } from "@/lib/types/skill";
import LoadingSpinner from "../LoadingSpinner";
import ButtonIcon from "./plus-square-outline.svg";
import DoneIcon from "./checkmark-circle-outline.svg";

enum STATE {
  INITIAL,
  LOADING,
  ERROR,
  SUCCESS,
}

interface Props {
  skill: Skill;
  user: {
    id?: string;
    email?: string;
    name?: string;
  };
}

export default function SkillBadge({ skill, user }: Props) {
  const [state, setState] = useState<STATE>(STATE.INITIAL);
  async function onEndorse(skillId: string) {
    setState(STATE.LOADING);
    const res = await fetch("/api/endorsement", {
      body: JSON.stringify({
        skillId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const { error } = await res.json();
    if (error) {
      setState(STATE.ERROR);
      return;
    }
    mutate("/api/skill-category");
    setState(STATE.SUCCESS);
  }
  const isUserEndorsed = skill?.users?.find((p) => p.id === user?.id);

  return (
    <div className="space-y-4">
      <div className="text-base font-semibold flex items-center">
        {state === STATE.LOADING ? (
          <LoadingSpinner />
        ) : isUserEndorsed ? (
          <button
            className="disabled:hover:cursor-not-allowed font-semibold text-success-700 dark:text-success-400"
            title="You already endorsed this skill."
            disabled
          >
            <DoneIcon className="w-8 h-8 inline fill-current " />
          </button>
        ) : (
          <button
            className="disabled:hover:cursor-not-allowed font-semibold text-primary-600 dark:text-primary-400 hover:text-gray-700 dark:hover:text-gray-300 disabled:text-gray-700 dark:disabled:text-gray-300 "
            disabled={!Boolean(user)}
            onClick={() => onEndorse(skill.id)}
          >
            <ButtonIcon className="w-8 h-8 inline fill-current " />
          </button>
        )}
        <span className="ml-2">{skill.name}</span>
      </div>

      {skill.users.length > 0 && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong className="text-black dark:text-white">{skill.users.length}</strong>{" "}
          {`${skill.name} endorsement${skill.users.length > 1 ? "s" : ""}`} from{" "}
          <span className="text-black dark:text-white">
            {skill.users.map((user) => user.name).join(", ")}
          </span>
        </p>
      )}
      {state === STATE.ERROR && <ErrorMessage>An unexpected error occurred.</ErrorMessage>}
      {state === STATE.SUCCESS && <SuccessMessage>Thank you for your endorsement!</SuccessMessage>}
    </div>
  );
}
