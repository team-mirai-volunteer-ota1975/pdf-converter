import { Hono } from "hono"
import { handle } from "hono/vercel"
import { cors } from "hono/cors"
import { parsePdf } from "./pdfService.js"  // api/から相対パス調整

const app = new Hono()
app.use("*", cors())

// ← ここは "/" にしておく
app.post("/", async (c) => {
  const body = await c.req.parseBody()
  const file = body["file"]

  if (!(file instanceof File)) {
    return c.text("No file uploaded", 400)
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const text = await parsePdf(buffer)

  return c.json({
    filename: file.name,
    length: text.length,
    text,
    preview: text.slice(0, 500) + "..."
  })
})

export const POST = handle(app)
