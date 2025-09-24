import { Hono } from "hono"
import { handle } from "hono/vercel"

const app = new Hono()
app.get("/", (c) => c.text("API is running 🚀"))

export const GET = handle(app)
