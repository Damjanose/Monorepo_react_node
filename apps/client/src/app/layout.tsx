import type { Metadata } from "next"
import { Providers } from "../components/Providers"
import { Shell } from "../components/Shell"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles.css"

export const metadata: Metadata = {
  title: "Jewellery",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  )
}
