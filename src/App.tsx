import { Route, Routes } from "react-router-dom"
import { CategoryLayout } from "./cases/categories/components/category-layout"
import { CategoryForm } from "./cases/categories/components/category-form"
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <div className="wrapper">

      <main>
        <Routes>
          <Route path="/categories" element={<CategoryLayout />}>
            <Route path="new" element={<CategoryForm />} />
            <Route path=":id" element={<CategoryForm />} />
          </Route>
        </Routes>
      </main>

      <ToastContainer />

    </div>
  )
}

export default App