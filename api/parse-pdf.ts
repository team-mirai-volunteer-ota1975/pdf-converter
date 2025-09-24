import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import type { Context, Next } from 'hono'
import { parsePdf } from './pdfService'

const app = new Hono()

// ---- 自前CORS（hono/corsは使わない）----
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}
app.use('*', async (c: Context, next: Next) => {
  if (c.req.method === 'OPTIONS') return c.text('', 204, corsHeaders)
  await next()
  for (const [k, v] of Object.entries(corsHeaders)) c.header(k, v)
})

app.post("/parse-pdf", async (c) => {
  const body = await c.req.parseBody()
  const file = body["file"]

  if (!(file instanceof File)) {
    return c.text("No file uploaded", 400)
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  try {
    const text = await parsePdf(buffer)
    return c.json({
      filename: file.name,
      length: text.length,
      text,
      preview: text.slice(0, 500) + "..."
    })
  } catch (err: any) {
    console.error(err)
    return c.text("PDF parsing failed: " + err.message, 500)
  }
})

export default handle(app)
