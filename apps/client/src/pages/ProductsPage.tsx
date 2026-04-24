import { useProducts } from "../hooks/useCatalog"

export const ProductsPage = () => {
  const { data, isLoading, isError } = useProducts()

  if (isLoading) return <div className="alert alert-info">Loading products...</div>
  if (isError) return <div className="alert alert-danger">Could not load products</div>

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h1 className="h3 fw-bold mb-3">Products</h1>
        <p className="text-secondary mb-4">All products available in the catalog.</p>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th>Product</th>
                <th className="text-end">Price</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((product) => (
                <tr key={product.id}>
                  <td className="fw-medium">{product.name}</td>
                  <td className="text-end">${Number(product.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
