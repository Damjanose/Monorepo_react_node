import { Link, Navigate, Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { CategoryProductsPage } from "./pages/CategoryProductsPage"
import { CategoriesPage } from "./pages/CategoriesPage"
import { LoginPage } from "./pages/LoginPage"
import { ProductsPage } from "./pages/ProductsPage"
import { RegisterPage } from "./pages/RegisterPage"
import { useAuth } from "./types/auth-context"

export const App = () => {
  const { user, logout } = useAuth()

  return (
    <div className="min-vh-100 bg-body-tertiary">
      <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-semibold" to="/categories">
            Catalog
          </Link>
          <div className="navbar-nav d-flex flex-row gap-2 gap-md-3 align-items-center">
            <Link className="nav-link" to="/categories">
              Categories
            </Link>
            <Link className="nav-link" to="/products">
              Products
            </Link>
            {!user && (
              <Link className="nav-link" to="/login">
                Login
              </Link>
            )}
            {!user && (
              <Link className="btn btn-primary btn-sm px-3" to="/register">
                Register
              </Link>
            )}
            {user && (
              <button className="btn btn-outline-danger btn-sm px-3" onClick={() => void logout()}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
      <main className="container py-4 py-md-5">
        <Routes>
          <Route path="/" element={<Navigate to="/categories" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <CategoriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/:categoryId/products"
            element={
              <ProtectedRoute>
                <CategoryProductsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  )
}
