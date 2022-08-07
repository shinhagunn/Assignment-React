import './App.css'
import '../node_modules/antd/dist/antd.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ToastContainer from './components/Toast'
import Home from './pages'
import CartPage from './pages/cart'
import Dashboard from './pages/dashboard'
import Categories from './pages/dashboard/categories'
import Products from './pages/dashboard/products'
import CreateProduct from './pages/dashboard/products/create'
import UpdateProduct from './pages/dashboard/products/update'
import HomePage from './pages/home'
import Login from './pages/login'
import ProductPage from './pages/product'
import Register from './pages/register'

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Route>
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
    </Routes>
    <ToastContainer />
  </BrowserRouter>)
}

export default App
