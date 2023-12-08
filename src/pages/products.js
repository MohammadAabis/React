import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Products = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products/" + id)
      .then((res) => res.json())
      .then((json) => setProduct(json));
  }, []);

  const addToCart = () => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    if (cartItems === null) cartItems = [];

    if (cartItems && cartItems.length) {
      const temp = cartItems.filter((item) => item.id === id);
      if (!temp.length) {
        const cart = {
          id: id,
          qty: 1,
          price: product.price,
          title: product.title,
          thumbnail: product.thumbnail,
        };
        cartItems.push(cart);
      } else {
        const cartItems_temp = cartItems.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              qty: item.qty + 1,
            };
          } else {
            return item;
          }
        });
        cartItems = cartItems_temp;
      }
    } else {
      const cart = {
        id: id,
        qty: 1,
        price: product.price,
        title: product.title,
        thumbnail: product.thumbnail,
      };
      cartItems.push(cart);
    }
    console.log(cartItems);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
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
              <li class="active">Single Product</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="content-wraper">
        <div class="container">
          <div class="row single-product-area">
            <div class="col-lg-5 col-md-6">
              <div class="product-details-left">
                <div class="product-details-images slider-navigation-1">
                  <div class="lg-image">
                    <a
                      class="popup-img venobox vbox-item"
                      href="images/product/large-size/1.jpg"
                      data-gall="myGallery"
                    >
                      <img src={product.thumbnail} alt="product image" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-7 col-md-6">
              <div class="product-details-view-content pt-60">
                <div class="product-info">
                  <h2>{product.title}</h2>
                  <div class="rating-box pt-20">
                    <ul class="rating rating-with-review-item">
                      <li>
                        <i class="fa fa-star-o"></i>
                      </li>
                      <li>
                        <i class="fa fa-star-o"></i>
                      </li>
                      <li>
                        <i class="fa fa-star-o"></i>
                      </li>
                      <li class="no-star">
                        <i class="fa fa-star-o"></i>
                      </li>
                      <li class="no-star">
                        <i class="fa fa-star-o"></i>
                      </li>
                    </ul>
                  </div>
                  <div class="price-box pt-20">
                    <span class="new-price new-price-2">${product.price}</span>
                  </div>
                  <div class="product-desc">
                    <p>
                      <span>{product.description}</span>
                    </p>
                  </div>

                  <div class="product-variants">
                    <div class="produt-variants-size">
                      <label className="text-left">Dimension</label>
                      <select class="nice-select">
                        <option value="1" title="S" selected="selected">
                          40x60cm
                        </option>
                        <option value="2" title="M">
                          60x90cm
                        </option>
                        <option value="3" title="L">
                          80x120cm
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="single-add-to-cart">
                    <form action="#" class="cart-quantity">
                      <div class="quantity">
                        <label className="text-left">Quantity</label>
                        <div class="cart-plus-minus">
                          <input
                            class="cart-plus-minus-box"
                            value="1"
                            type="text"
                          />
                          <div class="dec qtybutton">
                            <i class="fa fa-angle-down"></i>
                          </div>
                          <div class="inc qtybutton">
                            <i class="fa fa-angle-up"></i>
                          </div>
                        </div>
                      </div>
                      <button
                        class="add-to-cart"
                        type="submit"
                        onClick={addToCart}
                      >
                        Add to cart
                      </button>
                    </form>
                  </div>
                  <div class="product-additional-info pt-25">
                    <a class="wishlist-btn" href="wishlist.html">
                      <i class="fa fa-heart-o"></i>Add to wishlist
                    </a>
                    <div class="product-social-sharing pt-25">
                      <ul>
                        <li class="facebook">
                          <a href="#">
                            <i class="fa fa-facebook"></i>Facebook
                          </a>
                        </li>
                        <li class="twitter">
                          <a href="#">
                            <i class="fa fa-twitter"></i>Twitter
                          </a>
                        </li>
                        <li class="google-plus">
                          <a href="#">
                            <i class="fa fa-google-plus"></i>Google +
                          </a>
                        </li>
                        <li class="instagram">
                          <a href="#">
                            <i class="fa fa-instagram"></i>Instagram
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
