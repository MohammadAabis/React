import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems") || "[]")
  );
  const [subtotal, setsubtotal] = useState(0);

  useEffect(() => {
    let total = 0;
    let qty = 0;
    cartItems.map((items) => {
      total += parseFloat(items.price) * parseFloat(items.qty);
      setsubtotal(total);
    });
  }, []);

  const removeFromCart = (pid) => {
    const cartItems_temp = cartItems.filter((items) => items.id != pid);
    setCartItems(cartItems_temp);
    localStorage.setItem("cartItems", JSON.stringify(cartItems_temp));
  };

  const qtyPlus = (pid) => {
    let items = JSON.parse(localStorage.getItem("cartItems"));
    const cartItems_temp = items.map((item) => {
      if (item.id === pid) {
        return {
          ...item,
          qty: item.qty + 1,
        };
      } else {
        return item;
      }
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems_temp));

    const getQty = cartItems_temp.filter((item) => item.id === pid);
    document.getElementById("qty" + pid).value = getQty[0].qty;
    const price = getQty[0].qty * getQty[0].price;
    document.getElementById("amount" + pid).innerHTML = "$" + price;
    console.log(price);
  };

  const qtyMinus = (pid) => {
    let items = JSON.parse(localStorage.getItem("cartItems"));
    const cartItems_temp = items.map((item) => {
      if (item.id === pid) {
        return {
          ...item,
          qty: item.qty > 1 ? item.qty - 1 : 1,
        };
      } else {
        return item;
      }
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems_temp));

    const getQty = cartItems_temp.filter((item) => item.id === pid);
    document.getElementById("qty" + pid).value = getQty[0].qty;
    const price = getQty[0].qty * getQty[0].price;
    document.getElementById("amount" + pid).innerHTML = "$" + price;
  };

  return (
    <>
      <div class="breadcrumb-area">
        <div class="container">
          <div class="breadcrumb-content">
            <ul>
              <li>
                <a href="index.html">Home</a>
              </li>

              <li class="active">Shopping Cart</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="Shopping-cart-area pt-60 pb-60">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <form action="#">
                <div class="table-content table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th class="li-product-remove">remove</th>
                        <th class="li-product-thumbnail">images</th>
                        <th class="cart-product-name">Product</th>
                        <th class="li-product-price">Unit Price</th>
                        <th class="li-product-quantity">Quantity</th>
                        <th class="li-product-subtotal">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems != null &&
                        cartItems.length &&
                        cartItems.map((item) => (
                          <tr>
                            <td class="li-product-remove">
                              <button onClick={() => removeFromCart(item.id)}>
                                <i class="fa fa-times"></i>
                              </button>
                            </td>
                            <td class="li-product-thumbnail">
                              <a href="#">
                                <img
                                  src={item.thumbnail}
                                  alt="Li's Product Image"
                                  width={150}
                                />
                              </a>
                            </td>
                            <td class="li-product-name">
                              <Link to={"/product/" + item.id}>
                                {item.title}
                              </Link>
                            </td>
                            <td class="li-product-price">
                              <span class="amount">${item.price}</span>
                            </td>
                            <td class="quantity">
                              <div class="cart-plus-minus">
                                <input
                                  class="cart-plus-minus-box"
                                  value={item.qty}
                                  type="text"
                                  id={"qty" + item.id}
                                />

                                <div
                                  class="dec qtybutton"
                                  onClick={() => qtyMinus(item.id)}
                                >
                                  <i class="fa fa-angle-down"></i>
                                </div>
                                <div
                                  class="inc qtybutton"
                                  onClick={() => qtyPlus(item.id)}
                                >
                                  <i class="fa fa-angle-up"></i>
                                </div>
                              </div>
                            </td>
                            <td class="product-subtotal">
                              <span class="amount" id={"amount" + item.id}>
                                ${item.qty * item.price}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div class="row">
                  <div class="col-12">
                    <div class="coupon-all">
                      <div class="coupon">
                        <input
                          id="coupon_code"
                          class="input-text"
                          name="coupon_code"
                          value=""
                          placeholder="Coupon code"
                          type="text"
                        />
                        <input
                          class="button"
                          name="apply_coupon"
                          value="Apply coupon"
                          type="submit"
                        />
                      </div>
                      <div class="coupon2">
                        <input
                          class="button"
                          name="update_cart"
                          value="Update cart"
                          type="submit"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-5 ml-auto">
                    <div class="cart-page-total">
                      <h2>Cart totals</h2>
                      <ul>
                        <li>
                          Subtotal <span>${subtotal}</span>
                        </li>
                        <li>
                          Total <span>${subtotal}</span>
                        </li>
                      </ul>
                      <Link to="/checkout">Proceed to checkout</Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
