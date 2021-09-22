import { useEffect } from "react";
import useSWR from "swr";

import fetcher from "@/lib/fetcher";

export default function useViewCounter(slug) {
  const { data } = useSWR<{ total: unknown }>(`/api/view-count/${slug}`, fetcher);
  const views = new Number(data?.total);

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/view-count/${slug}`, {
        method: "POST",
      });

    registerView();
  }, [slug]);

  return `${views > 0 ? views.toLocaleString() : "–––"} views`;
}
