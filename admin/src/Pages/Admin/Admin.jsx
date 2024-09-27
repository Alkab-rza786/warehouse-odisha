import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import Dashboard from '../../Components/Dashboard/Dashboard'
import Order from '../../Components/Orders/Order'


function Admin() {
    return (
        <div className='admin'>
            <Sidebar />
            <Routes>
                <Route path='/addproduct' element={<AddProduct />} ></Route>
                <Route path='/listproduct' element={<ListProduct />} ></Route>
                <Route path='/dashboard' element={<Dashboard/>} ></Route>
                <Route path='/orderlist' element={<Order/>} ></Route>
            </Routes>
        </div>
    )
}

export default Admin
