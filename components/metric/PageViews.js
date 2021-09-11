import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function PageViews() {
  const { data } = useSWR('/api/analytics', fetcher)

  const pageViews = data?.pageViews

  return pageViews ? (
    <p className="text-sm text-gray-600 dark:text-gray-400">
      Page views: <span className="font-semibold">{pageViews}</span>
    </p>
  ) : (
    <LoadingSpinner />
  )
}
