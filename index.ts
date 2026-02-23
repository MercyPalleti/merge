import { Hono } from 'hono'

interface Env {
  DATABASE_URL: string
}

const app = new Hono<{ Bindings: Env }>()

app.post('/api/users', async (c) => {
  try {
    // Note: For Cloudflare Workers with Prisma, you need to:
    // 1. Use Prisma Data Proxy with a connection URL like: prisma://...?api_key=...
    // 2. Or use D1 (Cloudflare's native SQLite database)
    // 3. Or proxy requests to a backend server
    
    const body = await c.req.json()
    
    // Mock response for now
    const user = {
      id: 1,
      email: body.email,
      name: body.name,
      password: body.password
    }
    
    return c.json({ success: true, user })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json({ error: message }, 400)
  }
})

export default app