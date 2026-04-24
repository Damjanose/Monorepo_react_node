import { useQuery } from "@tanstack/react-query"
import type { Product } from "@template/types"
import { useParams } from "react-router-dom"
import { apiClient } from "../api/client"

export const CategoryProductsPage = () => {
  const { categoryId = "" } = useParams()
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categoryProducts", categoryId],
    queryFn: async () => {
      const { data } = await apiClient.get<Product[]>(`/categories/${categoryId}/products`)
      return data
    },
    enabled: !!categoryId,
  })

  if (isLoading) return <div className="alert alert-info">Loading products...</div>
  if (isError) return <div className="alert alert-danger">Could not load category products</div>

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h1 className="h3 fw-bold mb-3">Products in Category</h1>
        <p className="text-secondary mb-4">Filtered products for category ID: {categoryId}</p>
        <div className="list-group">
          {data?.map((product) => (
            <div key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{product.name}</span>
              <span className="badge text-bg-light border">ID #{product.id}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
