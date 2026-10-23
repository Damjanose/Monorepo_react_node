import { StaffRoute } from "../../components/StaffRoute"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <StaffRoute>{children}</StaffRoute>
}
