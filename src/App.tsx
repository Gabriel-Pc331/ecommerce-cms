import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import BrandList from "./cases/brands/pages/BrandList";
import ProductList from "./cases/products/pages/ProductList";
import { CategoryDataTable } from "@/cases/categories/components/data-table/category-data-table";

export default function App() {
  return (
    <Router>
      <div className="wrapper" style={{ padding: 16 }}>
        <nav style={{ marginBottom: 20, display: "flex", gap: 12 }}>
          <Link to="/brands">Brands</Link>
          <Link to="/products">Products</Link>
          <Link to="/categories">Categories</Link> {}
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/brands" replace />} />
          <Route path="/brands" element={<BrandList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/categories" element={<CategoryDataTable />} /> {}
        </Routes>
      </div>
    </Router>
  );
}
