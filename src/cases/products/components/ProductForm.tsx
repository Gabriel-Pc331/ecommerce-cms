import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate, useParams } from "react-router-dom"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useProduct, useCreateProduct, useUpdateProduct } from "../hooks/use-product"

const productSchema = z.object({
  name: z.string().min(2, "O nome do produto deve ter pelo menos 2 caracteres"),
  price: z.number().positive("O preço deve ser maior que zero"),
  brandId: z.string().uuid("Selecione uma marca válida"),
})

type ProductFormData = z.infer<typeof productSchema>

export function ProductForm() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEditing = !!id

  const { data: product } = useProduct(id || "")
  const createProduct = useCreateProduct()
  const updateProduct = useUpdateProduct()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: { name: "", price: 0, brandId: "" },
  })

  useEffect(() => {
    if (product) reset(product)
  }, [product, reset])

  async function onSubmit(data: ProductFormData) {
    try {
      if (isEditing && id) {
        await updateProduct.mutateAsync({ id, data })
      } else {
        await createProduct.mutateAsync(data)
      }
      navigate("/products")
    } catch (err) {
      console.error("Erro ao salvar produto:", err)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-card rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-4">
        {isEditing ? "Editar Produto" : "Novo Produto"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome do Produto</label>
          <Input placeholder="Digite o nome" {...register("name")} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Preço</label>
          <Input type="number" step="0.01" {...register("price", { valueAsNumber: true })} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Marca (UUID)</label>
          <Input placeholder="ID da marca" {...register("brandId")} />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => navigate("/products")}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isEditing ? "Salvar Alterações" : "Adicionar"}
          </Button>
        </div>
      </form>
    </div>
  )
}
