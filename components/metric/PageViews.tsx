import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Analytic } from "pages/api/analytics";

export default function PageViews() {
  const { data } = useSWR<Analytic>("/api/analytics", fetcher);

  const pageViews = data?.pageViews;

  return pageViews ? (
    <p className="text-sm text-gray-600 dark:text-gray-400">
      All views: <span className="font-semibold">{pageViews}</span>
    </p>
  ) : (
    <LoadingSpinner />
  );
}
