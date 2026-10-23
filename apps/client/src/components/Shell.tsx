"use client"

import Link from "next/link"
import { useSocketLifecycle } from "../hooks/useSocketLifecycle"
import { useAuth } from "../types/auth-context"
import { NotificationBell } from "./notifications/NotificationBell"

export const Shell = ({ children }: { children: React.ReactNode }) => {
  useSocketLifecycle()
  const { user, logout } = useAuth()

  const staff =
    user &&
    (user.permissions.includes("admin") ||
      user.permissions.includes("product.write") ||
      user.permissions.includes("order.write"))

  return (
    <div className="min-vh-100 bg-body-tertiary">
      <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-semibold" href="/">
            Jewellery
          </Link>
          <div className="navbar-nav d-flex flex-row flex-wrap gap-2 gap-md-3 align-items-center">
            <Link className="nav-link" href="/">
              Home
            </Link>
            <Link className="nav-link" href="/categories">
              Categories
            </Link>
            <Link className="nav-link" href="/products">
              Products
            </Link>
            {user && (
              <>
                <Link className="nav-link" href="/cart">
                  Cart
                </Link>
                <Link className="nav-link" href="/account">
                  Account
                </Link>
                <NotificationBell />
              </>
            )}
            {staff && (
              <Link className="nav-link text-primary fw-medium" href="/admin">
                Admin
              </Link>
            )}
            {!user && (
              <Link className="nav-link" href="/login">
                Login
              </Link>
            )}
            {!user && (
              <Link className="btn btn-primary btn-sm px-3" href="/register">
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
      <main className="container py-4 py-md-5">{children}</main>
    </div>
  )
}
