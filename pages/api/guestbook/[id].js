import redis from '@/lib/redis'
import { getSession } from 'next-auth/client'

const guestbookEntries = async (req, res) => {
  const { user } = await getSession({ req })

  const { id } = req.query
  const entry = JSON.parse((await redis.hget('guestbook', id)) || 'null')

  if (req.method === 'GET') {
    return res.json(entry)
  }

  if (req.method === 'DELETE') {
    if (!user || user.name !== entry.created_by) {
      return res.status(403).send('Unauthorized')
    }

    await redis.hdel('guestbook', id)
    return res.status(204).json({})
  }

  if (req.method === 'PUT') {
    if (!user || user.name !== entry.created_by) {
      return res.status(403).send('Unauthorized')
    }

    const updated = {
      id,
      email: user.email,
      updated_at: Date.now(),
      body: (req.body.body || '').slice(0, 500),
      created_by: user.name,
    }

    await redis.hset('guestbook', id, JSON.stringify(updated))
    return res.status(201).json(updated)
  }

  return res.send('Method not allowed.')
}
export default guestbookEntries
