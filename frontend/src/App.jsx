import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Shop from './Components/Pages/Shop'
import ShopCategory from './Components/Pages/ShopCategory'
import Product from './Components/Pages/Product'
import LoginSignUp from './Components/Pages/LoginSignUp'
import Cart from './Components/Pages/Cart'
import Footer from './Components/Footer/Footer'
import men_banner from './assets/Frontend_Assets/banner_mens.png'
import women_banner from './assets/Frontend_Assets/banner_women.png'
import kid_banner from './assets/Frontend_Assets/banner_kids.png'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} ></Route>
          <Route path='/mens' element={<ShopCategory category="men" banner={men_banner} />}  ></Route>
          <Route path='/womens' element={<ShopCategory category="women" banner={women_banner} />} ></Route>
          <Route path='/kids' element={<ShopCategory category="kid" banner={kid_banner} />}  ></Route>
          <Route path='/product' element={<Product />} >
            <Route path=':productId' element={<Product />}></Route>
          </Route>
          <Route path='/cart' element={<Cart />} ></Route>
          <Route path='/login' element={<LoginSignUp />} ></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
