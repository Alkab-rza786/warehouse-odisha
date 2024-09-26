import React from 'react';
import './Dashboard.css'; // Custom CSS for styling if required

const Dashboard = () => {
  // Placeholder data (this can come from props or API)
  const stockAlerts = [
    { orderId: '001', date: '2024-09-01', quantity: 100, alertAmt: 20, status: 'Low' },
    { orderId: '002', date: '2024-09-05', quantity: 50, alertAmt: 10, status: 'OK' },
    { orderId: '003', date: '2024-09-10', quantity: 200, alertAmt: 30, status: 'Low' },
  ];

  const topSellingProducts = [
    { orderId: '004', quantity: 300, alertAmt: 50 },
    { orderId: '005', quantity: 150, alertAmt: 20 },
    { orderId: '006', quantity: 500, alertAmt: 60 },
  ];

  return (
    <div className="dashboard">
      {/* Revenue, Sales Return, Purchase, Income Section */}
      <div className="metrics">
        <div className="metric-card">
          <p>Revenue</p>
          <h3>+ 30,000</h3>
        </div>
        <div className="metric-card">
          <p>Sales Return</p>
          <h3>+ 30,000</h3>
        </div>
        <div className="metric-card">
          <p>Purchase</p>
          <h3>+ 30,000</h3>
        </div>
        <div className="metric-card">
          <p>Income</p>
          <h3>+ 30,000</h3>
        </div>
      </div>

      {/* Stock Alert and Top Selling Products Section */}
      <div className="tables">
        <div className="table-section">
          <h4>Stock Alert</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Quantity</th>
                <th>Alert Amt.</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {stockAlerts.map((alert) => (
                <tr key={alert.orderId}>
                  <td>{alert.orderId}</td>
                  <td>{alert.date}</td>
                  <td>{alert.quantity}</td>
                  <td>{alert.alertAmt}</td>
                  <td>{alert.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-section">
          <h4>Top Selling Products</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Quantity</th>
                <th>Alert Amt.</th>
              </tr>
            </thead>
            <tbody>
              {topSellingProducts.map((product) => (
                <tr key={product.orderId}>
                  <td>{product.orderId}</td>
                  <td>{product.quantity}</td>
                  <td>{product.alertAmt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
