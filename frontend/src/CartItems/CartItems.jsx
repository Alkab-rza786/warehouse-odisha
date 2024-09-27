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
        quantity: 0, // Initialize to 0
        total: getTotalCartAmount()
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder({ ...order, [name]: value });
    }

    // Function to calculate the total quantity of items in the cart
    const calculateTotalQuantity = () => {
        let totalQuantity = 0;
        all_product.forEach((product) => {
            if (cartItems[product.id] > 0) {
                totalQuantity += cartItems[product.id];
            }
        });
        return totalQuantity;
    }

    // Function to handle order submission
    const handlePlaceOrder = async () => {
        // Update the quantity in the order state before submitting
        const totalQuantity = calculateTotalQuantity();
        setOrder((prevOrder) => ({
            ...prevOrder,
            quantity: totalQuantity,
            total: getTotalCartAmount()
        }));

        const response = await fetch('http://localhost:4000/addorderlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...order,  // Spread order state values
                quantity: totalQuantity,  // Ensure quantity is passed correctly
                total: getTotalCartAmount() // Ensure total is up to date
            }),
        });

        if (response.ok) {
            alert('Order placed successfully!');
            // Optionally reset the form
            setOrder({
                customerName: "",
                address: "",
                city: "",
                pin: "",
                paymentMethod: "",
                quantity: 0,
                total: getTotalCartAmount()
            });
        } else {
            alert('Error placing order!');
        }
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
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return <div key={e.id}>
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
            })}
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

                    <button onClick={handlePlaceOrder}>PLACE ORDER</button>
                </div>

                <div className="cartitems-promocode">
                    <form className="place-order">
                        <div className="place-order-left ">
                            <p className="title">Delivery Information</p>
                            <div className="multi-fields">
                                <input type="text" name="customerName" value={order.customerName} onChange={handleChange} placeholder='Name' />
                            </div>
                            <input type="text" name="address" value={order.address} onChange={handleChange} placeholder='Address' />
                            <div className="multi-fields">
                                <input type="text" name="city" value={order.city} onChange={handleChange} placeholder='City' />
                            </div>
                            <div className="multi-fields">
                                <input type="text" name="pin" value={order.pin} onChange={handleChange} placeholder='Pin Code' />
                            </div>
                            <div className="multi-fields">
                                <select name="paymentMethod" value={order.paymentMethod} onChange={handleChange}>
                                    <option value="UPI">UPI</option>
                                    <option value="Card">Debit/Credit Card</option>
                                    <option value="NetBanking">Net Banking</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CartItems;
