import React, { useState, useEffect } from "react";
import { Link, json } from "react-router-dom";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems") || "[]")
  );

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json.products));
  }, []);

  const addToCart = (id) => {
    console.log(id);
    fetch("https://dummyjson.com/products/" + id)
      .then((res) => res.json())
      .then((json) => setProduct(json.product));

    console.log(product);

    let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    if (cartItems === null) cartItems = [];

    if (cartItems && cartItems.length) {
      const temp = cartItems.filter(
        (item) => parseInt(item.id) === parseInt(id)
      );
      if (!temp.length) {
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

  const addToCart1 = (id) => {
    fetch("https://dummyjson.com/products/" + id)
      .then((res) => res.json())
      .then((json) => setProduct(json));

    console.log(product);

    setCartItems(JSON.parse(localStorage.getItem("cartItems") || "[]"));
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
        setCartItems(cart);
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

        setCartItems(cartItems_temp);
      }
    } else {
      console.log("else: ", product);
      const cart = {
        id: id,
        qty: 1,
        price: product.price,
        title: product.title,
        thumbnail: product.thumbnail,
      };
      setCartItems(cart);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  return (
    <>
      <div class="breadcrumb-area">
        <div class="container">
          <div class="breadcrumb-content"></div>
        </div>
      </div>
      <div class="content-wraper pt-60 pb-60">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="single-banner shop-page-banner">
                <a href="#">
                  <img
                    src={`${process.env.PUBLIC_URL}/img/2.jpg`}
                    alt="Li's Static Banner"
                  />
                </a>
              </div>
              <div class="shop-top-bar mt-30">
                <div class="shop-bar-inner">
                  <div class="product-view-mode">
                    <ul class="nav shop-item-filter-list" role="tablist">
                      <li class="active" role="presentation">
                        <a
                          aria-selected="true"
                          class="active show"
                          data-toggle="tab"
                          role="tab"
                          aria-controls="grid-view"
                          href="#grid-view"
                        >
                          <i class="fa fa-th"></i>
                        </a>
                      </li>
                      <li role="presentation">
                        <a
                          data-toggle="tab"
                          role="tab"
                          aria-controls="list-view"
                          href="#list-view"
                        >
                          <i class="fa fa-th-list"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="toolbar-amount">
                    <span>Showing 1 to 9 of 15</span>
                  </div>
                </div>
                <div class="product-select-box">
                  <div class="product-short">
                    <p>Sort By:</p>
                    <select class="nice-select">
                      <option value="trending">Relevance</option>
                      <option value="sales">Name (A - Z)</option>
                      <option value="sales">Name (Z - A)</option>
                      <option value="rating">Price (Low &gt; High)</option>
                      <option value="date">Rating (Lowest)</option>
                      <option value="price-asc">Model (A - Z)</option>
                      <option value="price-asc">Model (Z - A)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="shop-products-wrapper">
                <div class="tab-content">
                  <div
                    id="grid-view"
                    class="tab-pane fade active show"
                    role="tabpanel"
                  >
                    <div class="product-area shop-product-area">
                      <div class="row">
                        {products &&
                          products.map((prod) => (
                            <div
                              class="col-lg-3 col-md-4 col-sm-6 mt-40"
                              key={prod.id}
                            >
                              <div class="single-product-wrap">
                                <div class="product-image">
                                  <Link to={"/product/" + prod.id}>
                                    <img
                                      src={prod.thumbnail}
                                      alt="Li's Product Image"
                                    />
                                  </Link>
                                  <span class="sticker">New</span>
                                </div>
                                <div class="product_desc">
                                  <div class="product_desc_info">
                                    <div class="product-review">
                                      <h5 class="manufacturer">
                                        <Link to={"/product/" + prod.id}>
                                          {prod.category}
                                        </Link>
                                      </h5>
                                      <div class="rating-box">
                                        <ul class="rating">
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
                                    </div>
                                    <h4>
                                      <Link to={"/product/" + prod.id}>
                                        {prod.title}
                                      </Link>
                                    </h4>
                                    <div class="price-box">
                                      <span class="new-price">
                                        ${prod.price}
                                      </span>
                                    </div>
                                  </div>
                                  <div class="add-actions">
                                    <ul class="add-actions-link">
                                      <li class="add-cart active">
                                        <button
                                          class="add-to-cart"
                                          type="submit"
                                          onClick={() => addToCart1(prod.id)}
                                        >
                                          Add to cart
                                        </button>
                                      </li>
                                      <li>
                                        <a
                                          href="#"
                                          title="quick view"
                                          class="quick-view-btn"
                                          data-toggle="modal"
                                          data-target="#exampleModalCenter"
                                        >
                                          <i class="fa fa-eye"></i>
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          class="links-details"
                                          href="wishlist.html"
                                        >
                                          <i class="fa fa-heart-o"></i>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div
                    id="list-view"
                    class="tab-pane product-list-view fade"
                    role="tabpanel"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  /*const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products").then((res) =>
      setProducts(res.data)
    );
    //.then((json) => setProducts(json));

    console.log(products);
  }, []);

  return <div>This is category page.</div>;*/
};

export default Category;
