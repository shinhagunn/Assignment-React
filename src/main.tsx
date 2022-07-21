import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ToastContainer from './components/Toast'
import './index.css'
import Dashboard from './pages/dashboard'
import Categories from './pages/dashboard/categories'
import Products from './pages/dashboard/products'
import CreateProduct from './pages/dashboard/products/create'
import UpdateProduct from './pages/dashboard/products/update'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/products">
              <Route path="/dashboard/products/create" element={<CreateProduct />} />
              <Route path="/dashboard/products/update/:id" element={<UpdateProduct />} />
              <Route path="/dashboard/products/" element={<Products />} />
            </Route>
            <Route path="/dashboard/categories">
              <Route path="/dashboard/categories/" element={<Categories />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
)
