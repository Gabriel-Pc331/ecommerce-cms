import { Route, Routes, Navigate } from "react-router-dom"
import { CategoryLayout } from "./cases/categories/components/category-layout"
import { CategoryForm } from "./cases/categories/components/category-form"
import BrandList from "./cases/brands/pages/BrandList"
import { BrandForm } from "./cases/brands/components/brand-form"
import ProductList from "./cases/products/pages/ProductList"
import { ProductForm } from "./cases/products/components/ProductForm"

function App() {
  return (
    <div className="wrapper">
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/categories" replace />} />
          <Route path="/categories" element={<CategoryLayout />}>
            <Route path="new" element={<CategoryForm />} />
            <Route path=":id" element={<CategoryForm />} />
          </Route>
          <Route path="/brands" element={<BrandList />} />
          <Route path="/brands/new" element={<BrandForm />} />
          <Route path="/brands/:id" element={<BrandForm />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/:id" element={<ProductForm />} />
          <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
