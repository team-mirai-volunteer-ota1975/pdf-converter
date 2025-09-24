import { Hono } from "hono"
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

export default app
