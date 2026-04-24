import "dotenv/config"
import express from "express"
import cors from "cors"
import * as authHandlers from "./handlers/auth.js"
import * as categoryHandlers from "./handlers/categories.js"
import * as productHandlers from "./handlers/products.js"
import { requireAuth, requirePermission } from "./middleware/auth.js"

const app = express()
const port = Number(process.env.API_PORT ?? 3001)

app.use(cors())
app.use(express.json())

app.get("/health", (_req, res) => res.json({ ok: true }))

app.post("/auth/register", authHandlers.register)
app.post("/auth/login", authHandlers.login)
app.post("/auth/refresh", authHandlers.refresh)
app.post("/auth/logout", requireAuth, authHandlers.logout)
app.get("/auth/me", requireAuth, authHandlers.me)

app.get("/categories", requireAuth, categoryHandlers.list)
app.get("/categories/:id", requireAuth, categoryHandlers.getById)
app.post("/categories", requireAuth, requirePermission("category.write"), categoryHandlers.create)
app.patch("/categories/:id", requireAuth, requirePermission("category.write"), categoryHandlers.update)
app.delete("/categories/:id", requireAuth, requirePermission("category.write"), categoryHandlers.remove)

app.get("/products", requireAuth, productHandlers.list)
app.get("/products/:id", requireAuth, productHandlers.getById)
app.get("/categories/:id/products", requireAuth, productHandlers.listByCategory)
app.post("/products", requireAuth, requirePermission("product.write"), productHandlers.create)
app.patch("/products/:id", requireAuth, requirePermission("product.write"), productHandlers.update)
app.delete("/products/:id", requireAuth, requirePermission("product.write"), productHandlers.remove)

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})
