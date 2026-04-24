import "dotenv/config"
import bcrypt from "bcryptjs"
import pg from "pg"

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("DATABASE_URL is required")
}

const permissions = ["admin", "product.read", "product.write", "category.read", "category.write"]

const seed = async () => {
  const client = new pg.Client({ connectionString })
  await client.connect()

  try {
    await client.query("BEGIN")

    for (const permissionName of permissions) {
      await client.query("INSERT INTO permissions(name) VALUES($1) ON CONFLICT (name) DO NOTHING", [
        permissionName,
      ])
    }

    const passwordHash = await bcrypt.hash("n", 10)
    const userResult = await client.query(
      `
      INSERT INTO users(email, password_hash)
      VALUES($1, $2)
      ON CONFLICT (email)
      DO UPDATE SET updated_at = NOW()
      RETURNING id
      `,
      ["admin@example.com", passwordHash],
    )

    const userId = userResult.rows[0].id as string

    await client.query(
      `
      INSERT INTO user_details(user_id, full_name)
      VALUES($1, $2)
      ON CONFLICT (user_id)
      DO UPDATE SET full_name = EXCLUDED.full_name, updated_at = NOW()
      `,
      [userId, "Template Admin"],
    )

    await client.query(
      `
      INSERT INTO user_permissions(user_id, permission_id)
      SELECT $1, p.id
      FROM permissions p
      ON CONFLICT DO NOTHING
      `,
      [userId],
    )

    const catRes = await client.query(
      `
      INSERT INTO categories(name, description)
      VALUES
        ('Electronics', 'Devices and gadgets'),
        ('Books', 'Physical and digital books')
      ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description, updated_at = NOW()
      RETURNING id, name
      `,
    )

    const electronicsId =
      catRes.rows.find((row) => row.name === "Electronics")?.id ??
      (await client.query("SELECT id FROM categories WHERE name = 'Electronics' LIMIT 1")).rows[0].id

    const booksId =
      catRes.rows.find((row) => row.name === "Books")?.id ??
      (await client.query("SELECT id FROM categories WHERE name = 'Books' LIMIT 1")).rows[0].id

    await client.query(
      `
      INSERT INTO products(category_id, name, description, price, is_active)
      VALUES
        ($1, 'Wireless Headphones', 'Noise-cancelling headphones', 159.99, true),
        ($2, 'TypeScript Guide', 'Learn TypeScript with examples', 39.00, true)
      ON CONFLICT DO NOTHING
      `,
      [electronicsId, booksId],
    )

    await client.query("COMMIT")
    console.log("Seed completed")
    console.log("Admin user: admin@example.com / Admin123!")
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    await client.end()
  }
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
