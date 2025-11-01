import { useEffect, useState } from "react";
import { useBrands, useCreateBrand, useDeleteBrand, useUpdateBrand } from "../../hooks/use-brand";
import type { BrandDto } from "../../dtos/brand.dto";


export default function BrandList() {
  const { data, isLoading, error } = useBrands();
  const createBrand = useCreateBrand();
  const updateBrand = useUpdateBrand();
  const deleteBrand = useDeleteBrand();

  const [name, setName] = useState("");
  const [editing, setEditing] = useState<BrandDto | null>(null);

  useEffect(() => {
    if (!createBrand.isPending && !createBrand.isError) setName("");
  }, [createBrand.isPending, createBrand.isError]);

  if (isLoading) return <p>Carregando marcas...</p>;
  if (error) return <p>Erro ao carregar marcas.</p>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      updateBrand.mutate({ id: editing.id!, data: { name } }, { onSuccess: () => setEditing(null) });
    } else {
      createBrand.mutate({ name });
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <h1>Brand (ATVB2.2)</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          placeholder="Nome da marca"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">{editing ? "Salvar" : "Criar"}</button>
        {editing && (
          <button type="button" onClick={() => { setEditing(null); setName(""); }}>
            Cancelar
          </button>
        )}
      </form>

      <table width="100%" cellPadding={8} style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f2f2f2" }}>
            <th align="left">ID</th>
            <th align="left">Nome</th>
            <th align="left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(b => (
            <tr key={b.id} style={{ borderTop: "1px solid #eee" }}>
              <td>{b.id}</td>
              <td>{b.name}</td>
              <td>
                <button onClick={() => { setEditing(b); setName(b.name); }}>
                  Editar
                </button>{" "}
                <button onClick={() => deleteBrand.mutate(b.id!)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
          {data?.length === 0 && (
            <tr><td colSpan={3}>Nenhuma marca cadastrada.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
