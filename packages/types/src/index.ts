export type PermissionName =
  | "admin"
  | "product.read"
  | "product.write"
  | "category.read"
  | "category.write"

export type User = {
  id: string
  email: string
  isActive: boolean
  fullName: string
  permissions: PermissionName[]
}

export type Category = {
  id: string
  name: string
  description: string | null
  createdAt: string
  updatedAt: string
}

export type Product = {
  id: string
  categoryId: string
  name: string
  description: string | null
  price: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type AuthTokens = {
  accessToken: string
  refreshToken: string
}

export type AuthResponse = {
  user: User
  tokens: AuthTokens
}

export type LoginInput = {
  email: string
  password: string
}

export type RegisterInput = {
  email: string
  password: string
  fullName: string
}

export type CreateCategoryInput = {
  name: string
  description?: string
}

export type UpdateCategoryInput = {
  name?: string
  description?: string
}

export type CreateProductInput = {
  categoryId: string
  name: string
  description?: string
  price: string
}

export type UpdateProductInput = {
  categoryId?: string
  name?: string
  description?: string
  price?: string
  isActive?: boolean
}
