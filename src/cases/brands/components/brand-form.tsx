import { SidebarForm } from "@/components/layout/Sidebar-form"
import { useParams } from "react-router-dom"
import { useBrand } from "../hooks/use-brand"

export function BrandForm() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useBrand(id ?? "")

  function handleSave() {
    alert("Bah!")
  }

  return (
    <SidebarForm
      title="Cadastro de Marca"
      onSave={handleSave}
      loading={isLoading}
    >
      {isLoading ? (
        <h4>Carregando...</h4>
      ) : (
        <pre className="text-sm bg-gray-50 p-2 rounded-md overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </SidebarForm>
  )
}
