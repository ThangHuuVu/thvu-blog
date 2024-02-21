"use client";

import { useFormState, useFormStatus } from "react-dom";
import { addEntry } from "./actions";

export const AddEntryForm = () => {
  const [state, formAction] = useFormState(addEntry, {
    message: "",
  });
  const { pending } = useFormStatus();
  return (
    <form action={formAction} className="w-full my-4 flex flex-col items-center gap-4">
      <textarea
        id="body"
        name="body"
        aria-label="Your message"
        placeholder="Your message..."
        required
        style={{ resize: "none" }}
        className="px-4 py-2 focus:ring-primary-500 focus:border-primary-500 block w-full border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      />
      <button
        className="px-4 py-2 flex items-center justify-center my-4 font-semibold text-lg text-white bg-primary-400 dark:bg-primary-600 hover:bg-primary-500 dark:hover:bg-primary-500 rounded self-end"
        type="submit"
        aria-disabled={pending}
      >
        Send
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
};
