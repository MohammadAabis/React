import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HomeApi, addCustomerApi } from "../helpers/api";
import UserSlice, { login } from "../features/userSlice";
import { useDispatch } from "react-redux";

const Checkout = () => {
  const [clicktoLogin, setclicktoLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [paswrd, setPaswrd] = useState("");
  const [sameBillToShip, setsameBillToShip] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const [formData, setformData] = useState({
    country_billing: "",
    first_name_billing: "",
    last_name_billing: "",
    company_billing: "",
    address1_billing: "",
    address2_billing: "",
    city_billing: "",
    state_billing: "",
    zip_billing: "",
    email_billing: "",
    phone_billing: "",
    payment: "",
  });
  const [shippingData, setshippingData] = useState({
    country_shipping: "",
    first_name_shipping: "",
    last_name_shipping: "",
    company_shipping: "",
    address1_shipping: "",
    address2_shipping: "",
    city_shipping: "",
    state_shipping: "",
    zip_shipping: "",
    email_shipping: "",
    phone_shipping: "",
    order_notes_shipping: "",
  });
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems") || "[]")
  );
  const navigate = useNavigate();
  console.log(cartItems);
  let subtotal = 0;
  cartItems.map((items) => {
    subtotal = parseFloat(items.price) * parseFloat(items.qty);
  });
  subtotal = subtotal.toFixed(2);

  const handleSubmitCheckout = () => {
    //HomeApi().then((res) => console.log(res));
    //return;
    let isValid = true;
    for (let key in formData) {
      if (!formData[key]) {
        isValid = false;
        break;
      }
    }

    if (!cartItems || !cartItems.length) {
      seterrorMsg("Cart is empty");
      return;
    }

    if (!isValid) {
      seterrorMsg("Please fill required fields.");
      return;
    }

    if (
      formData.email_billing &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email_billing)
    ) {
      seterrorMsg("Invalid email address!");
      return;
    }

    if (
      formData.phone_billing.length < 11 &&
      formData.phone_billing.length > 11
    ) {
      seterrorMsg("Phone number is not correct!");
      return;
    }

    seterrorMsg("");

    let data = {};
    if (!sameBillToShip) {
      shippingData.country_shipping = formData.country_billing;
      shippingData.first_name_shipping = formData.first_name_billing;
      shippingData.last_name_shipping = formData.last_name_billing;
      shippingData.company_shipping = formData.company_billing;
      shippingData.address1_shipping = formData.address1_billing;
      shippingData.address2_shipping = formData.address2_billing;
      shippingData.city_shipping = formData.city_billing;
      shippingData.state_shipping = formData.state_billing;
      shippingData.zip_shipping = formData.zip_billing;
      shippingData.email_shipping = formData.email_billing;
      shippingData.phone_shipping = formData.phone_billing;

      data = {
        customer: { ...formData, ...shippingData },
        orders: cartItems,
      };
    } else {
      data = {
        customer: { ...shippingData, ...formData },
        orders: cartItems,
      };
    }
    console.log(data);
    addCustomerApi(data).then((res) => {
      console.log(res);
      if (res.data.status && res.data.status === "Success") {
        localStorage.setItem("cartItems", "");
        navigate("/order/" + res.data.order_id);
      }
    });
  };

  const handleOnChange = (event) => {
    seterrorMsg("");
    if (event.target.name === "email_billing") {
      if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(event.target.value)
      ) {
        seterrorMsg("Invalid email!");
      }
    }

    setformData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnChangeShipping = (event) => {
    seterrorMsg("");
    if (event.target.name === "email") {
      if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(event.target.value)
      ) {
        seterrorMsg("Invalid email address");
      }
    }

    setshippingData({
      ...shippingData,
      [event.target.name]: event.target.value,
    });
  };

  const dispatch = useDispatch();
  const handleOnSubmit = (e) => {
    dispatch(
      login({
        email: email,
        passwrd: paswrd,
        isLogin: true,
      })
    );
    navigate("/blogs");
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
              <li class="active">Checkout</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="checkout-area pt-60 pb-30">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="coupon-accordion">
                <h3>
                  Returning customer?{" "}
                  <span
                    id="showlogin"
                    onClick={() => {
                      clicktoLogin
                        ? setclicktoLogin(false)
                        : setclicktoLogin(true);
                    }}
                  >
                    Click here to login
                  </span>
                </h3>
                {clicktoLogin && (
                  <div id="checkout-login" class="coupon-contents">
                    <div class="coupon-info">
                      <p class="coupon-text">
                        Quisque gravida turpis sit amet nulla posuere lacinia.
                        Cras sed est sit amet ipsum luctus.
                      </p>
                      <form onSubmit={(e) => handleOnSubmit(e)}>
                        <p class="form-row-first">
                          <label>
                            Email <span class="required">*</span>
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                        </p>
                        <p class="form-row-last">
                          <label>
                            Password <span class="required">*</span>
                          </label>
                          <input
                            type="password"
                            value={paswrd}
                            onChange={(e) => {
                              setPaswrd(e.target.value);
                            }}
                          />
                        </p>
                        <p class="form-row">
                          <input value="Login" type="submit" />
                          <label>
                            <input type="checkbox" />
                            Remember me
                          </label>
                        </p>
                        <p class="lost-password">
                          <a href="#">Lost your password?</a>
                        </p>
                      </form>
                    </div>
                  </div>
                )}

                <h3>
                  Have a coupon?{" "}
                  <span id="showcoupon">Click here to enter your code</span>
                </h3>
                <div id="checkout_coupon" class="coupon-checkout-content">
                  <div class="coupon-info">
                    <form action="#">
                      <p class="checkout-coupon">
                        <input placeholder="Coupon code" type="text" />
                        <input value="Apply Coupon" type="submit" />
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6 col-12">
              <form>
                <div class="checkbox-form">
                  <h3>Billing Details</h3>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="country-select clearfix">
                        <label>
                          Country <span class="required">*</span>
                        </label>
                        <select
                          class="nice-select wide"
                          name="country_billing"
                          onChange={handleOnChange}
                        >
                          <option data-display="Bangladesh">Bangladesh</option>
                          <option value="London">London</option>
                          <option value="Romania">Romania</option>
                          <option value="French">French</option>
                          <option value="Germany">Germany</option>
                          <option value="Australia">Australia</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="checkout-form-list">
                        <label>
                          First Name <span class="required">*</span>
                        </label>
                        <input
                          placeholder=""
                          type="text"
                          name="first_name_billing"
                          onChange={handleOnChange}
                          onKeyUp={handleOnChange}
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="checkout-form-list">
                        <label>
                          Last Name <span class="required">*</span>
                        </label>
                        <input
                          placeholder=""
                          type="text"
                          name="last_name_billing"
                          onChange={handleOnChange}
                        />
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="checkout-form-list">
                        <label>Company Name</label>
                        <input
                          placeholder=""
                          type="text"
                          name="company_billing"
                          onChange={handleOnChange}
                        />
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="checkout-form-list">
                        <label>
                          Address <span class="required">*</span>
                        </label>
                        <input
                          placeholder="Street address"
                          type="text"
                          name="address1_billing"
                          onChange={handleOnChange}
                        />
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="checkout-form-list">
                        <input
                          placeholder="Apartment, suite, unit etc. (optional)"
                          type="text"
                          name="address2_billing"
                          onChange={handleOnChange}
                        />
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="checkout-form-list">
                        <label>
                          Town / City <span class="required">*</span>
                        </label>
                        <input
                          type="text"
                          name="city_billing"
                          onChange={handleOnChange}
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="checkout-form-list">
                        <label>
                          State / County <span class="required">*</span>
                        </label>
                        <input
                          placeholder=""
                          type="text"
                          name="state_billing"
                          onChange={handleOnChange}
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="checkout-form-list">
                        <label>
                          Postcode / Zip <span class="required">*</span>
                        </label>
                        <input
                          placeholder=""
                          type="text"
                          name="zip_billing"
                          onChange={handleOnChange}
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="checkout-form-list">
                        <label>
                          Email Address <span class="required">*</span>
                        </label>
                        <input
                          placeholder=""
                          type="email"
                          name="email_billing"
                          onChange={handleOnChange}
                        />
                      </div>
                      <div>{errorMsg.email_billing}</div>
                    </div>
                    <div class="col-md-6">
                      <div class="checkout-form-list">
                        <label>
                          Phone <span class="required">*</span>
                        </label>
                        <input
                          type="number"
                          name="phone_billing"
                          onChange={handleOnChange}
                        />
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="checkout-form-list create-acc">
                        <input id="cbox" type="checkbox" name="is_create" />
                        <label>Create an account?</label>
                      </div>
                      <div
                        id="cbox-info"
                        class="checkout-form-list create-account"
                      >
                        <p>
                          Create an account by entering the information below.
                          If you are a returning customer please login at the
                          top of the page.
                        </p>
                        <label>
                          Account password <span class="required">*</span>
                        </label>
                        <input
                          placeholder="password"
                          type="password"
                          name="passwd"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="different-address">
                    <div class="ship-different-title">
                      <h3>
                        <label>Ship to a different address?</label>
                        <input
                          id="ship-box"
                          type="checkbox"
                          onClick={() => {
                            sameBillToShip
                              ? setsameBillToShip(false)
                              : setsameBillToShip(true);
                          }}
                        />
                      </h3>
                    </div>
                    {sameBillToShip && (
                      <div id="ship-box-info" class="row d-block">
                        <div class="col-md-12">
                          <div class="country-select clearfix">
                            <label>
                              Country <span class="required">*</span>
                            </label>
                            <select
                              class="nice-select wide"
                              name="country_shipping"
                              onChange={handleOnChangeShipping}
                            >
                              <option data-display="Bangladesh">
                                Bangladesh
                              </option>
                              <option value="London">London</option>
                              <option value="Romania">Romania</option>
                              <option value="French">French</option>
                              <option value="Germany">Germany</option>
                              <option value="Australia">Australia</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="checkout-form-list">
                            <label>
                              First Name <span class="required">*</span>
                            </label>
                            <input
                              placeholder=""
                              type="text"
                              name="first_name_shipping"
                              onChange={handleOnChangeShipping}
                            />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="checkout-form-list">
                            <label>
                              Last Name <span class="required">*</span>
                            </label>
                            <input
                              placeholder=""
                              type="text"
                              name="last_name_shipping"
                              onChange={handleOnChangeShipping}
                            />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="checkout-form-list">
                            <label>Company Name</label>
                            <input
                              placeholder=""
                              type="text"
                              name="company_shipping"
                              onChange={handleOnChangeShipping}
                            />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="checkout-form-list">
                            <label>
                              Address <span class="required">*</span>
                            </label>
                            <input
                              placeholder="Street address"
                              type="text"
                              name="address1_shipping"
                              onChange={handleOnChangeShipping}
                            />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="checkout-form-list">
                            <input
                              placeholder="Apartment, suite, unit etc. (optional)"
                              type="text"
                              name="address2_shipping"
                              onChange={handleOnChangeShipping}
                            />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="checkout-form-list">
                            <label>
                              Town / City <span class="required">*</span>
                            </label>
                            <input
                              type="text"
                              name="city_shipping"
                              onChange={handleOnChangeShipping}
                            />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="checkout-form-list">
                            <label>
                              State / County <span class="required">*</span>
                            </label>
                            <input
                              placeholder=""
                              type="text"
                              name="state_shipping"
                              onChange={handleOnChangeShipping}
                            />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="checkout-form-list">
                            <label>
                              Postcode / Zip <span class="required">*</span>
                            </label>
                            <input
                              placeholder=""
                              type="text"
                              name="zip_shipping"
                              onChange={handleOnChangeShipping}
                            />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="checkout-form-list">
                            <label>
                              Email Address <span class="required">*</span>
                            </label>
                            <input
                              placeholder=""
                              type="email"
                              name="email_shipping"
                              onChange={handleOnChangeShipping}
                            />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="checkout-form-list">
                            <label>
                              Phone <span class="required">*</span>
                            </label>
                            <input
                              type="text"
                              name="phone_shipping"
                              onChange={handleOnChangeShipping}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <div class="order-notes">
                      <div class="checkout-form-list">
                        <label>Order Notes</label>
                        <textarea
                          id="checkout-mess"
                          cols="30"
                          rows="10"
                          placeholder="Notes about your order, e.g. special notes for delivery."
                          name="order_notes_shipping"
                          onChange={handleOnChangeShipping}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-lg-6 col-12">
              <div class="your-order">
                <h3>Your order</h3>
                <div class="your-order-table table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th class="cart-product-name">Product</th>
                        <th class="cart-product-total">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((items) => (
                        <tr class="cart_item">
                          <td class="cart-product-name">
                            {" "}
                            {items.title}
                            <strong class="product-quantity">
                              {" "}
                              × {items.qty}
                            </strong>
                          </td>
                          <td class="cart-product-total">
                            <span class="amount">
                              ${items.price * items.qty}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr class="cart-subtotal">
                        <th>Cart Subtotal </th>
                        <td>
                          <span class="amount">${subtotal}</span>
                        </td>
                      </tr>
                      <tr class="order-total">
                        <th>Order Total</th>
                        <td>
                          <strong>
                            <span class="amount">${subtotal}</span>
                          </strong>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div class="payment-method">
                  <div class="payment-accordion">
                    <div id="accordion">
                      <div class="card">
                        <div class="card-header" id="#payment-1">
                          <input
                            name="payment"
                            type="radio"
                            value="Direct Bank Transfer"
                            onChange={handleOnChange}
                          />
                          <h5 class="panel-title">Direct Bank Transfer</h5>
                        </div>
                        <div class="card-header" id="#payment-1">
                          <input
                            name="payment"
                            type="radio"
                            value="Cheque Payment"
                            onChange={handleOnChange}
                          />
                          <h5 class="panel-title">Cheque Payment</h5>
                        </div>
                        <div class="card-header" id="#payment-1">
                          <input
                            name="payment"
                            type="radio"
                            value="Paypal"
                            onChange={handleOnChange}
                          />
                          <h5 class="panel-title">PayPal</h5>
                        </div>
                      </div>
                      <div class="card">
                        <div id="" class="" data-parent="#accordion">
                          <div class="card-body">
                            <p>
                              Make your payment directly into our bank account.
                              Please use your Order ID as the payment reference.
                              Your order won’t be shipped until the funds have
                              cleared in our account.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="order-button-payment">
                      <input
                        value="Place order"
                        type="submit"
                        onClick={handleSubmitCheckout}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 style={{ color: "red" }}>{errorMsg}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
