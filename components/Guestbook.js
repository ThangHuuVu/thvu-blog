import { useState, useRef } from 'react'
import { format } from 'date-fns'
import useSWR, { mutate } from 'swr'

import fetcher from '@/lib/fetcher'
import SuccessMessage from '@/components/SuccessMessage'
import ErrorMessage from '@/components/ErrorMessage'
import LoadingSpinner from '@/components/LoadingSpinner'
import { signIn, signOut, useSession } from 'next-auth/client'
import CustomLink from './Link'

function GuestbookEntry({ entry, user }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const deleteEntry = async (e) => {
    e.preventDefault()
    setIsDeleting(true)

    await fetch(`/api/guestbook/${entry.id}`, {
      method: 'DELETE',
    })

    mutate('/api/guestbook')
  }

  return (
    <>
      {isDeleting ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col space-y-2">
          <div className="text-gray-700 max-w-none dark:text-gray-300">{entry.body}</div>
          <div className="flex items-center space-x-3">
            <p className="text-sm text-gray-500">{entry.created_by}</p>
            <span className=" text-gray-300 dark:text-gray-700">/</span>
            <p className="text-sm text-gray-300 dark:text-gray-700">
              {format(new Date(entry.updated_at), "d MMM yyyy 'at' h:mm bb")}
            </p>
            {user && entry.created_by === user.name && (
              <>
                <span className="text-gray-300 dark:text-gray-700">/</span>
                <button className="text-sm text-red-600 dark:text-red-400" onClick={deleteEntry}>
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default function Guestbook({ initialEntries }) {
  const [form, setForm] = useState(false)
  const inputEl = useRef(null)
  const [session] = useSession()
  const { error: entriesError, data: entries } = useSWR('/api/guestbook', fetcher, {
    initialData: initialEntries,
  })

  const leaveEntry = async (e) => {
    e.preventDefault()
    setForm({ state: 'loading' })

    const res = await fetch('/api/guestbook', {
      body: JSON.stringify({
        body: inputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { error } = await res.json()
    if (error) {
      setForm({
        state: 'error',
        message: error,
      })
      return
    }

    inputEl.current.value = ''
    mutate('/api/guestbook')
    setForm({
      state: 'success',
      message: 'You did it! Thank you for signing my guestbook.',
    })
  }

  return (
    <>
      <div className="border-2 border-blue-200 dark:border-blue-800 rounded-md p-6 prose dark:prose-dark lg:prose-xl">
        <h5 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
          Sign the Guestbook {session?.user?.name ? ` as ${session?.user?.name} ` : ''}
          <span role="img" aria-label="guestbook">
            ✍️
          </span>
        </h5>
        {session ? (
          <form className="w-full flex flex-col gap-4 mt-4" onSubmit={leaveEntry}>
            <textarea
              ref={inputEl}
              aria-label="Your message"
              placeholder="Your message..."
              required
              className="px-4 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <button
              className="flex items-center justify-center px-4 font-bold h-8 bg-gray-100 dark:bg-gray-700 text-base text-gray-900 dark:text-gray-100 rounded w-28"
              type="submit"
            >
              {form.state === 'loading' ? <LoadingSpinner /> : 'Sign'}
            </button>
          </form>
        ) : (
          <button
            className="h-8 w-28 flex items-center justify-center my-4 font-semibold text-base bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded"
            href="/api/auth/signin"
            onClick={(e) => {
              e.preventDefault()
              signIn()
            }}
          >
            Login
          </button>
        )}
        {form.state === 'error' ? (
          <ErrorMessage>{form.message}</ErrorMessage>
        ) : form.state === 'success' ? (
          <SuccessMessage>{form.message}</SuccessMessage>
        ) : (
          <div />
        )}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Your information is only used to display your name and reply by email.{' '}
          {session && (
            <CustomLink
              className="font-semibold"
              href="/api/auth/signout"
              onClick={(e) => {
                e.preventDefault()
                signOut()
              }}
            >
              Log out
            </CustomLink>
          )}
        </p>
      </div>
      <div className="mt-4 space-y-8">
        {entriesError && (
          <ErrorMessage>
            An unexpected error occurred. The entries are not available for now. Please try again
            later
          </ErrorMessage>
        )}
        {entries ? (
          entries.map((entry) => (
            <GuestbookEntry key={entry.id} entry={entry} user={session?.user} />
          ))
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </>
  )
}
