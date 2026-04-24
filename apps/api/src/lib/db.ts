import { Kysely, PostgresDialect } from "kysely"
import pg from "pg"

export interface UsersTable {
  id: string
  email: string
  password_hash: string
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export interface UserDetailsTable {
  user_id: string
  full_name: string
  created_at: Date
  updated_at: Date
}

export interface PermissionsTable {
  id: string
  name: string
}

export interface UserPermissionsTable {
  user_id: string
  permission_id: string
}

export interface AuthSessionsTable {
  id: string
  user_id: string
  refresh_token_hash: string
  user_agent: string | null
  ip_address: string | null
  expires_at: Date
  revoked_at: Date | null
  created_at: Date
}

export interface CategoriesTable {
  id: string
  name: string
  description: string | null
  created_at: Date
  updated_at: Date
}

export interface ProductsTable {
  id: string
  category_id: string
  name: string
  description: string | null
  price: string
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export interface Database {
  users: UsersTable
  user_details: UserDetailsTable
  permissions: PermissionsTable
  user_permissions: UserPermissionsTable
  auth_sessions: AuthSessionsTable
  categories: CategoriesTable
  products: ProductsTable
}

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("DATABASE_URL is required")
}

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new pg.Pool({ connectionString }),
  }),
})
