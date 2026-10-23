import { Suspense } from "react"
import { ProductsPage } from "../../views/ProductsPage"

export default function Page() {
  // useSearchParams needs a Suspense boundary so the rest of the route can prerender.
  return (
    <Suspense>
      <ProductsPage />
    </Suspense>
  )
}
