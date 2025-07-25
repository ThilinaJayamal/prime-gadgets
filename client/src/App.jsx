import React from 'react'
import NavBar from './components/NavBar'
import MainBanner from './components/MainBanner'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer'
import { useAppContext } from './context/AppProvider'
import Login from './components/Login'
import AllProduct from './pages/AllProduct'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'
import MyOrders from './pages/MyOrders'
import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './pages/seller/SellerLayout'
import ProductList from './pages/seller/ProductList'
import AddProduct from './pages/seller/AddProduct'
import Orders from './pages/seller/Orders'
import Loading from './components/Loading'
import Contact from './pages/Contact'

function App() {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, isSeller } = useAppContext();
  return (
    <div className='text-base min-h-screen text-gray-700 bg-white'>

      {
        !isSellerPath && <NavBar />
      }

      {
        showUserLogin && <Login />
      }

      <Toaster />
      <div className={!isSellerPath ? "px-6 md:px-16 lg:px-24 xl:px-32" : ""}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProduct />} />
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/contacts' element={<Contact/>} />
          <Route path='/loader' element={<Loading/>}/>
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/my-orders' element={<MyOrders />} />
          <Route path='/seller' element={!isSeller ? <SellerLogin /> : <SellerLayout />}>
            <Route index element={<AddProduct />} />
            <Route path='product-list' element={<ProductList />} />
            <Route path='orders' element={<Orders />} />
          </Route>
        </Routes>
      </div>

      {
        !isSellerPath && <Footer />
      }
    </div>
  )
}

export default App