import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrders } from "../helpers/api";

const Orders = () => {
  const { oid } = useParams();
  const [items, setItems] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    getOrders({ order_id: oid }).then((res) => {
      console.log(res.data, "in orders");
      setItems(res.data.items);
      setOrderDetails(res.data.order_detail);
    });
  }, []);
  //console.log(items);

  //items.map((d) => console.log(d));
  return (
    <>
      <div class="col-lg-12 col-12">
        <div class="your-order">
          <div class="your-order-table table-responsive">
            <h2 style={{ color: "darkgoldenrod" }}>
              You have successfully placed an order!
            </h2>
          </div>
          <h3 style={{ marginTop: 20 }}>Your Order History</h3>
          <div class="your-order-table table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th class="cart-product-name">Product</th>
                  <th class="cart-product-total">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr class="cart_item">
                    <td class="cart-product-name">
                      {" "}
                      {item.item_name}
                      <strong class="product-quantity"> × {item.qty}</strong>
                    </td>
                    <td class="cart-product-total">
                      <span class="amount">${item.price}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr class="cart-subtotal">
                  <th>Cart Subtotal </th>
                  <td>
                    <span class="amount">$subtotal</span>
                  </td>
                </tr>
                <tr class="order-total">
                  <th>Order Total</th>
                  <td>
                    <strong>
                      <span class="amount">$subtotal</span>
                    </strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default Orders;
