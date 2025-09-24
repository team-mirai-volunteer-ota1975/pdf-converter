import { Hono } from "hono"

const app = new Hono()

app.get("/", (c) => c.text("API is running 🚀"))

export default app
