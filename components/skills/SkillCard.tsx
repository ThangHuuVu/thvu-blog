import React, { useState } from "react";
import { mutate } from "swr";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";
import { Skill } from "@/lib/types/skill";
import LoadingSpinner from "../LoadingSpinner";
import ArrowButton from "./arrow-up-circle.svg";
import colors from "../../designs/colors";

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
function getIconColor(hover, isDark) {
  console.log(isDark);
  if (isDark) {
    return hover ? colors.primary["400"] : "#fff";
  } else {
    return hover ? colors.primary["600"] : "#000";
  }
}

export default function SkillCard({ skill, user, isDark }: Props) {
  const [state, setState] = useState<STATE>(STATE.INITIAL);
  const [hover, setHover] = useState<boolean>(false);
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
    <div className="mb-2 ">
      <button
        className="flex items-center gap-1 text-lg font-semibold text-black dark:text-white hover:text-primary-600 dark:hover:text-primary-400 disabled:hover:cursor-not-allowed"
        onClick={() => onEndorse(skill.id)}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        disabled={!Boolean(user) || state === STATE.SUCCESS}
      >
        {state === STATE.LOADING ? (
          <LoadingSpinner />
        ) : (
          <ArrowButton stroke={getIconColor(hover, isDark)} className="inline" />
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
