import React, { useEffect, useState } from 'react';
import './Order.css';

function Order() {
  const [orderProduct, setOrderProducts] = useState([]);
  const [state, setState] = useState("Pending")

  const fetchInfo = async () => {
    const response = await fetch('http://localhost:4000/orderProducts');
    const data = await response.json();
    setOrderProducts(data);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const stateChange = () => {
    setState("product being packed ")
  }

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Image</p>
          <p>Items</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>status</p>

        </div>
        <br />
      </div>

      {orderProduct.map((order) => (
        <div key={order._id} className="order-details">
          {/* Loop through each product in the order */}
          {order.products.map((product) => (
            <div key={product.id} className="order-product">
              <div className="cart-items-title">
                <img src={product.image} style={{ width: "50px" }} alt={product.name} className="order-product-image" />
                <p>{product.name}</p>
                <p>{product.quantity}</p>
                <p>${product.total}</p>
                <p>{state}</p>
              </div>
            </div>
          ))}
          {/* Display order summary under the respective headings */}
          <div className="order-summary">
            <p>Customer's Name: <strong>{order.customerName}</strong></p>
            <p>Address: <strong>{order.address}</strong></p>
            <p>Payment Method: <strong>{order.paymentMethod}</strong></p>
            <p>Total Quantity: <strong>{order.quantity}</strong></p>
            <p>Total Amount: <strong>${order.total}</strong></p>
            <button onClick={
              stateChange
            } >ready for packed</button>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Order;
