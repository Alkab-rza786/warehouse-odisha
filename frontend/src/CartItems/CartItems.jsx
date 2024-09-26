import React, { useContext, useState } from 'react'
import './CartItems.css'
import { ShopContext } from '../Components/Context/ShopContext'
import remove_icon from '../assets/Frontend_Assets/cart_cross_icon.png'



function CartItems() {


    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext)

    const [order, setOrder] = useState({
        customerName: "",
        address: "",
        city: "",
        pin: "",
        paymentMethod: "",
        quantity: "",
        total: getTotalCartAmount
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder({ ...order, [name]: value })
    }



    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {
                all_product.map((e) => {
                    if (cartItems[e.id] > 0) {
                        return <div>
                            <div className='cartitems-format cartitems-format-main '>
                                <img className='carticon-product-icon' src={e.image} alt="" />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>${e.new_price * cartItems[e.id]}</p>
                                <img src={remove_icon} onClick={() => { removeFromCart(e.id) }} className='cartitems-remove-icon' alt="" />

                            </div>
                            <hr />
                        </div>
                    }
                    return null;
                })
            }
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>

                    <button >PLACE ORDER</button>
                </div>


                <form className="place-order cartitems-promocode">
                    <div className="place-order-left cartitems-promocode">
                        <p className="title">Delivery Information</p>
                        <div className="multi-fields">
                            <input type="text" placeholder='Name' />
                        </div>
                        <input type="text" placeholder='Address' />
                        <div className="multi-fields">
                            <input type="text" placeholder='City' />
                        </div>
                        <div className="multi-fields">
                            <input type="text" placeholder='Pin Code' />
                        </div>
                        <div className="multi-fields">
                            <select name="payment" id="payment">
                                <option value="UPI">UPI</option>
                                <option value="UPI">Debit/Credit Card
                                </option>
                                <option value="UPI">Net Banking
                                </option>
                            </select>
                        </div>
                    </div>

                </form>
            </div>
        </div>

    )
}

export default CartItems 
