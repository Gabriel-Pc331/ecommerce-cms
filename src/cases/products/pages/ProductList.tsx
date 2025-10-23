import { useEffect, useMemo, useState } from "react";
import { useProducts, useCreateProduct, useDeleteProduct, useUpdateProduct } from "../hooks/use-product";
import { useBrands } from "../../brands/hooks/use-brand";
import type { ProductDto } from "../dtos/product.dto";

export default function ProductList() {
  const { data, isLoading, error } = useProducts();
  const { data: brands } = useBrands();

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [form, setForm] = useState<Omit<ProductDto, "id">>({ name: "", price: 0, description: "", brandId: "" });
  const [editing, setEditing] = useState<ProductDto | null>(null);

  useEffect(() => {
    if (!createProduct.isPending && !createProduct.isError) {
      setForm({ name: "", price: 0, description: "", brandId: "" });
    }
  }, [createProduct.isPending, createProduct.isError]);

  const brandMap = useMemo(() => new Map((brands ?? []).map(b => [b.id, b.name])), [brands]);

  if (isLoading) return <p>Carregando produtos...</p>;
  if (error) return <p>Erro ao carregar produtos.</p>;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing?.id) {
      updateProduct.mutate({ id: editing.id, data: form }, { onSuccess: () => setEditing(null) });
    } else {
      createProduct.mutate(form);
    }
  };

  return (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>
      <h1>Product (ATVB2.3)</h1>

      <form onSubmit={submit} style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 160px 1fr 160px", alignItems: "center", marginBottom: 16 }}>
        <input
          placeholder="Nome do produto"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          required
        />
        <input
          placeholder="Descrição (opcional)"
          value={form.description ?? ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <select
          value={form.brandId ?? ""}
          onChange={(e) => setForm({ ...form, brandId: e.target.value || undefined })}
        >
          <option value="">Sem marca</option>
          {brands?.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>

        <div style={{ gridColumn: "1 / -1", display: "flex", gap: 8 }}>
          <button type="submit">{editing ? "Salvar" : "Criar"}</button>
          {editing && <button type="button" onClick={() => { setEditing(null); setForm({ name: "", price: 0, description: "", brandId: "" }); }}>Cancelar</button>}
        </div>
      </form>

      <table width="100%" cellPadding={8} style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f2f2f2" }}>
            <th align="left">ID</th>
            <th align="left">Nome</th>
            <th align="left">Preço</th>
            <th align="left">Marca</th>
            <th align="left">Descrição</th>
            <th align="left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(p => (
            <tr key={p.id} style={{ borderTop: "1px solid #eee" }}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>R$ {Number(p.price).toFixed(2)}</td>
              <td>{p.brandId ? brandMap.get(p.brandId) : "—"}</td>
              <td>{p.description ?? "—"}</td>
              <td>
                <button onClick={() => { setEditing(p); setForm({ name: p.name, price: p.price, description: p.description, brandId: p.brandId }); }}>
                  Editar
                </button>{" "}
                <button onClick={() => deleteProduct.mutate(p.id!)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
          {data?.length === 0 && (
            <tr><td colSpan={6}>Nenhum produto cadastrado.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
