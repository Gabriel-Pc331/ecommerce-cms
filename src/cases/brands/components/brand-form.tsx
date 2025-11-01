import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate, useParams } from "react-router-dom"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useBrand, useCreateBrand, useUpdateBrand } from "../hooks/use-brand"





const brandSchema = z.object({
  name: z.string().min(2, "O nome da marca deve ter pelo menos 2 caracteres"),
})

type BrandFormData = z.infer<typeof brandSchema>

export function BrandForm() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEditing = !!id

  const { data: brand } = useBrand(id || "")
  const createBrand = useCreateBrand()
  const updateBrand = useUpdateBrand()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<BrandFormData>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: "",
    },
  })

  useEffect(() => {
    if (brand) reset({ name: brand.name })
  }, [brand, reset])

  async function onSubmit(data: BrandFormData) {
    try {
      if (isEditing && id) {
        await updateBrand.mutateAsync({ id, data })
      } else {
        await createBrand.mutateAsync(data)
      }
      navigate("/brands")
    } catch (err) {
      console.error("Erro ao salvar marca:", err)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-card rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-4">
        {isEditing ? "Editar Marca" : "Nova Marca"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome da Marca</label>
          <Input placeholder="Digite o nome da marca" {...register("name")} />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => navigate("/brands")}>
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
