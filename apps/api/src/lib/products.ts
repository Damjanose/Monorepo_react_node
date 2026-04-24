import { db } from "./db.js"

export const listProducts = async () => {
  return db.selectFrom("products").selectAll().orderBy("name asc").execute()
}

export const getProduct = async (id: string) => {
  return db.selectFrom("products").selectAll().where("id", "=", id).executeTakeFirst()
}

export const listProductsByCategory = async (categoryId: string) => {
  return db.selectFrom("products").selectAll().where("category_id", "=", categoryId).orderBy("name asc").execute()
}

export const createProduct = async (input: {
  categoryId: string
  name: string
  description?: string
  price: string
}) => {
  return db
    .insertInto("products")
    .values({
      category_id: input.categoryId,
      name: input.name,
      description: input.description ?? null,
      price: input.price,
      is_active: true,
    })
    .returningAll()
    .executeTakeFirstOrThrow()
}

export const updateProduct = async (
  id: string,
  input: { categoryId?: string; name?: string; description?: string; price?: string; isActive?: boolean },
) => {
  return db
    .updateTable("products")
    .set({
      category_id: input.categoryId,
      name: input.name,
      description: input.description,
      price: input.price,
      is_active: input.isActive,
      updated_at: new Date(),
    })
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst()
}

export const removeProduct = async (id: string) => {
  return db.deleteFrom("products").where("id", "=", id).executeTakeFirst()
}
