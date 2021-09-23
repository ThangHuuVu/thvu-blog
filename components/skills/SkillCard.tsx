import React, { useState } from "react";
import { mutate } from "swr";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";
import { Skill } from "@/lib/types/skill";
import LoadingSpinner from "../LoadingSpinner";
import ArrowButton from "./arrow-up-circle.svg";

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
  isDark: boolean;
}

export default function SkillCard({ skill, user, isDark }: Props) {
  const [state, setState] = useState<STATE>(STATE.INITIAL);
  async function onEndorse(skillId: string) {
    setState(STATE.LOADING);
    const res = await fetch("/api/endorsement", {
      body: JSON.stringify({
        skillId,
        endorseBy: user?.name || "Test user",
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
    <div className="mb-2" key={skill.id}>
      <button
        className="flex items-center gap-1 text-xl font-semibold hover:text-green-700 dark:hover:text-green-300"
        onClick={() => onEndorse(skill.id)}
        disabled={!Boolean(user) || state === STATE.SUCCESS}
      >
        {state === STATE.LOADING ? (
          <LoadingSpinner />
        ) : (
          <ArrowButton
            // tailwind green
            stroke={isDark ? "#34D399" : "#047857"}
            className="inline"
          />
        )}
        <span>{skill.name}</span>
      </button>
      {skill.people.length > 0 && (
        <span>
          <strong>{skill.people.length}</strong>{" "}
          {`Endorsement${skill.people.length > 1 ? "s" : ""}`} from{" "}
          <span>{skill.people.join(", ")}</span>
        </span>
      )}
      {state === STATE.ERROR && <ErrorMessage>An unexpected error occurred.</ErrorMessage>}
      {state === STATE.SUCCESS && (
        <SuccessMessage>{`Thank you for your endorsement on ${skill.name}!`}</SuccessMessage>
      )}
    </div>
  );
}
