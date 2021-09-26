import React, { useState } from "react";
import { mutate } from "swr";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";
import { Skill } from "@/lib/types/skill";
import LoadingSpinner from "../LoadingSpinner";

enum STATE {
  INITIAL,
  LOADING,
  ERROR,
  SUCCESS,
}

interface Props {
  skill: Skill;
  user: {
    email?: string;
    name?: string;
  };
}

export default function SkillCard({ skill, user }: Props) {
  const [state, setState] = useState<STATE>(STATE.INITIAL);
  async function onEndorse(skillId: string) {
    setState(STATE.LOADING);
    const res = await fetch("/api/endorsement", {
      body: JSON.stringify({
        skillId,
        endorseBy: user?.name,
        email: user?.email || "not@provided.com",
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
    mutate("/api/skill");
    setState(STATE.SUCCESS);
  }

  return (
    <div className="flex flex-col">
      {state === STATE.LOADING ? (
        <LoadingSpinner />
      ) : (
        <button
          className="truncate flex items-center w-full rounded-lg px-4 py-2 text-lg font-semibold text-white bg-primary-400 dark:bg-primary-600 hover:bg-gray-700 disabled:bg-gray-700 dark:hover:bg-gray-600 dark:disabled:bg-gray-600 disabled:hover:cursor-not-allowed"
          onClick={() => onEndorse(skill.id)}
          disabled={!Boolean(user) || state === STATE.SUCCESS}
        >
          {skill.name}
        </button>
      )}

      {skill.people.length > 0 && (
        <p className="text-base text-gray-600 dark:text-gray-400">
          <strong className="text-black dark:text-white">{skill.people.length}</strong>{" "}
          {`${skill.name} endorsement${skill.people.length > 1 ? "s" : ""}`} from{" "}
          <span className="text-black dark:text-white">{skill.people.join(", ")}</span>
        </p>
      )}
      {state === STATE.ERROR && <ErrorMessage>An unexpected error occurred.</ErrorMessage>}
      {state === STATE.SUCCESS && (
        <SuccessMessage>{`Thank you for your endorsement on ${skill.name}!`}</SuccessMessage>
      )}
    </div>
  );
}
