import { Hono } from "hono"
import { serve } from "@hono/node-server"
import { cors } from "hono/cors"
import { parsePdf } from "./pdfService.js"

const app = new Hono()
app.use("*", cors())

app.post("/parse-pdf", async (c) => {
  const body = await c.req.parseBody()
  const file = body["file"]

  if (!(file instanceof File)) {
    return c.text("No file uploaded", 400)
  }

  // File → Buffer に変換
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  try {
    const text = await parsePdf(buffer)
    return c.json({
      filename: file.name,
      length: text.length,
      text,                            // ← ★全文返す
      preview: text.slice(0, 500) + "..." // おまけでプレビューも返す
    })
  } catch (err: any) {
    console.error(err)
    return c.text("PDF parsing failed: " + err.message, 500)
  }
})

serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`)
})
