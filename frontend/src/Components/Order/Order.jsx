import React, { useContext } from 'react'
import './Order.css'

function Order() {

  return (
    <form  className="place-order">
      <div className="place-order-left">
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
      <div className="place-order-right">
      <div className="cart-total">
        <h2>Cart Totals</h2>
        <div>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>₹</b>
          </div>
          </div>
        <button className='proceed-btn' >PLACE ORDER</button>
        </div>
      </div>
    </form>
  )
}

export default Order
