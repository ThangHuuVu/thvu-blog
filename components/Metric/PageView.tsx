import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Analytic } from "pages/api/analytics";
import ErrorMessage from "../ErrorMessage";

export default function PageViews() {
  const { data, error } = useSWR<Analytic>("/api/analytics", fetcher);

  if (error) return <ErrorMessage>An error occurred when trying to load pageviews.</ErrorMessage>;

  return data?.pageViews ? (
    <p className="text-sm text-gray-600 dark:text-gray-400">
      All views: <span className="font-semibold">{data?.pageViews}</span>
    </p>
  ) : (
    <LoadingSpinner />
  );
}
