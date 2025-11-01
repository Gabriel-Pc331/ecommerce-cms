import { Link } from "react-router-dom"
import { useProducts, useDeleteProduct } from "../hooks/use-product"

export default function ProductList() {
  const { data, isLoading, error } = useProducts()
  const deleteProduct = useDeleteProduct()

  if (isLoading) return <p>Carregando produtos...</p>
  if (error) return <p>Erro ao carregar produtos.</p>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Produtos</h1>
        <Link to="/products/new" className="bg-blue-500 text-white px-3 py-1 rounded">
          Novo Produto
        </Link>
      </div>

      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Nome</th>
            <th className="p-2 text-left">Preço</th>
            <th className="p-2 text-left">Marca</th>
            <th className="p-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.id}</td>
              <td className="p-2">{p.name}</td>
              <td className="p-2">R$ {p.price.toFixed(2)}</td>
              <td className="p-2">{p.brandId}</td>
              <td className="p-2 space-x-2">
                <Link
                  to={`/products/${p.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </Link>
                <button
                  onClick={() => deleteProduct.mutate(p.id!)}
                  className="text-red-600 hover:underline"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
          {data?.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center p-4">
                Nenhum produto cadastrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
