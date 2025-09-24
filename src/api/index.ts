import { Hono } from "hono"

const app = new Hono()

app.get("/", (c) => c.text("PDF Converter API is running"))

export default app
