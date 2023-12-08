import react, { useState, useEffect } from "react";
import {
  Route,
  Link,
  Routes,
  useParams,
  BrowserRouter,
  json,
} from "react-router-dom";
import SearchResult from "../pages/serachResult";

const Header = () => {
  const [cartdropdownOpen, setCartdropdownOpen] = useState(false);
  const [subtotal, setsubtotal] = useState(0);
  const [totalQuantity, settotalQuantity] = useState(0);
  const [removeBtn, setremoveBtn] = useState(false);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems") || "[]")
  );
  //localStorage.setItem("cartItems", "");

  const openCloseCartdropdown = () => {
    if (cartdropdownOpen) setCartdropdownOpen(false);
    else setCartdropdownOpen(true);
  };

  useEffect(() => {
    let total = 0;
    let qty = 0;
    cartItems.map((items) => {
      total += parseFloat(items.price) * parseFloat(items.qty);
      setsubtotal(total);
      qty += parseFloat(items.qty);
      settotalQuantity(qty);
    });
  }, []);

  const removeFromCart = (pid) => {
    const cartItems_temp = cartItems.filter((items) => items.id != pid);
    setCartItems(cartItems_temp);
    localStorage.setItem("cartItems", JSON.stringify(cartItems_temp));

    let total = 0;
    let qty = 0;
    cartItems.map((items) => {
      total += parseFloat(items.price) * parseFloat(items.qty);
      setsubtotal(total);
      qty += parseFloat(items.qty);
      settotalQuantity(qty);
    });
  };

  const [input, setinput] = useState();
  const [searchData, setSearchData] = useState([]);
  const fetchApi = (value) => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((json) => {
        //return console.log(json);
        let prod = json.products;
        //console.log(json);
        const result = prod.filter(
          (p) =>
            p.title.toString().toLowerCase().indexOf(value.toLowerCase()) > -1
        );
        setSearchData(result);
        if (!value) setSearchData([]);
      });
  };

  const handleonChange = (value) => {
    setinput(value);
    fetchApi(value);
  };

  return (
    <>
      <header>
        <div class="header-top">
          <div class="breadcrumb-content">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/blogs">Blogs</Link>
              </li>
              <li>
                <Link to="/category">Category</Link>
              </li>
              <li>
                <Link to="/Contact">Contact</Link>
              </li>
              <li>
                <Link to="/products">Product</Link>
              </li>
            </ul>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-lg-3 col-md-4">
                <div class="header-top-left">
                  <ul class="phone-wrap">
                    <li>
                      <span>Telephone Enquiry:</span>
                      <a href="#">(+123) 123 321 345</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-9 col-md-8">
                <div class="header-top-right">
                  <ul class="ht-menu">
                    <li>
                      <div class="ht-setting-trigger">
                        <span>Setting</span>
                      </div>
                      <div class="setting ht-setting">
                        <ul class="ht-setting-list">
                          <li>
                            <a href="login-register.html">My Account</a>
                          </li>
                          <li>
                            <a href="checkout.html">Checkout</a>
                          </li>
                          <li>
                            <a href="login-register.html">Sign In</a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <span class="currency-selector-wrapper">Currency :</span>
                      <div class="ht-currency-trigger">
                        <span>USD $</span>
                      </div>
                      <div class="currency ht-currency">
                        <ul class="ht-setting-list">
                          <li>
                            <a href="#">EUR €</a>
                          </li>
                          <li class="active">
                            <a href="#">USD $</a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <span class="language-selector-wrapper">Language :</span>
                      <div class="ht-language-trigger">
                        <span>English</span>
                      </div>
                      <div class="language ht-language">
                        <ul class="ht-setting-list">
                          <li class="active">
                            <a href="#">
                              <img src="images/menu/flag-icon/1.jpg" alt="" />
                              English
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img
                                src={`${process.env.PUBLIC_URL}/img/2.jpg`}
                                alt="ok"
                              />
                              Français
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="header-middle pl-sm-0 pr-sm-0 pl-xs-0 pr-xs-0">
          <div class="container">
            <div class="row">
              <div class="col-lg-3">
                <div class="logo pb-sm-30 pb-xs-30">
                  <a href="index.html">
                    <img
                      src={`${process.env.PUBLIC_URL}/img/1.jpg`}
                      alt="logo"
                    />
                  </a>
                </div>
              </div>
              <div class="col-lg-9 pl-0 ml-sm-15 ml-xs-15">
                <form action="#" class="hm-searchbox">
                  <select class="nice-select select-search-category">
                    <option value="0">All</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Enter your search key ..."
                    value={input}
                    onChange={(e) => handleonChange(e.target.value)}
                  />
                  {searchData && searchData.length ? (
                    <SearchResult results={searchData} />
                  ) : (
                    ""
                  )}
                  <button class="li-btn" type="submit">
                    <i class="fa fa-search"></i>
                  </button>
                </form>
                <div class="header-middle-right">
                  <ul class="hm-menu">
                    <li class="hm-wishlist">
                      <a href="wishlist.html">
                        <span class="cart-item-count wishlist-item-count">
                          0
                        </span>
                        <i class="fa fa-heart-o"></i>
                      </a>
                    </li>

                    <li class="hm-minicart">
                      <div
                        class="hm-minicart-trigger"
                        onClick={openCloseCartdropdown}
                      >
                        <span class="item-icon"></span>
                        <span class="item-text">
                          ${subtotal}
                          <span class="cart-item-count">{totalQuantity}</span>
                        </span>
                      </div>

                      {cartdropdownOpen && (
                        <div class="minicart" style={{ display: "block" }}>
                          <ul class="minicart-product-list">
                            {cartItems != null &&
                              cartItems.length &&
                              cartItems.map((item) => (
                                <li key={item.id}>
                                  <Link
                                    to={"/product/" + item.id}
                                    class="minicart-product-image"
                                  >
                                    <img
                                      src={`${item.thumbnail}`}
                                      alt="cart products"
                                    />
                                  </Link>
                                  <div class="minicart-product-details">
                                    <h6>
                                      <Link to={"/product/" + item.id}>
                                        {item.title}
                                      </Link>
                                    </h6>
                                    <span>
                                      ${item.price} x {item.qty}
                                    </span>
                                  </div>
                                  <button
                                    class="close"
                                    title="Remove"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <i class="fa fa-close"></i>
                                  </button>
                                </li>
                              ))}
                          </ul>
                          <p class="minicart-total">
                            SUBTOTAL: <span>${subtotal}</span>
                          </p>
                          <div class="minicart-button">
                            <Link
                              to="/viewcart"
                              class="li-button li-button-fullwidth li-button-dark"
                            >
                              <span>View Full Cart</span>
                            </Link>
                            <Link
                              to="/checkout"
                              class="li-button li-button-fullwidth"
                            >
                              <span>Checkout</span>
                            </Link>
                          </div>
                        </div>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="header-bottom mb-0 header-sticky stick d-none d-lg-block d-xl-block">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="hb-menu">
                  <nav>
                    <ul>
                      <li class="dropdown-holder">
                        <a href="index.html">Home</a>
                        <ul class="hb-dropdown">
                          <li>
                            <a href="index.html">Home One</a>
                          </li>
                          <li>
                            <a href="index-2.html">Home Two</a>
                          </li>
                          <li>
                            <a href="index-3.html">Home Three</a>
                          </li>
                          <li>
                            <a href="index-4.html">Home Four</a>
                          </li>
                        </ul>
                      </li>
                      <li class="catmenu-dropdown megamenu-holder">
                        <a href="shop-left-sidebar.html">Shop</a>
                        <ul class="megamenu hb-megamenu">
                          <li>
                            <a href="shop-left-sidebar.html">
                              Shop Page Layout
                            </a>
                            <ul>
                              <li>
                                <a href="shop-3-column.html">Shop 3 Column</a>
                              </li>
                              <li class="active">
                                <a href="shop-4-column.html">Shop 4 Column</a>
                              </li>
                              <li>
                                <a href="shop-left-sidebar.html">
                                  Shop Left Sidebar
                                </a>
                              </li>
                              <li>
                                <a href="shop-right-sidebar.html">
                                  Shop Right Sidebar
                                </a>
                              </li>
                              <li>
                                <a href="shop-list.html">Shop List</a>
                              </li>
                              <li>
                                <a href="shop-list-left-sidebar.html">
                                  Shop List Left Sidebar
                                </a>
                              </li>
                              <li>
                                <a href="shop-list-right-sidebar.html">
                                  Shop List Right Sidebar
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="single-product-gallery-left.html">
                              Single Product Style
                            </a>
                            <ul>
                              <li>
                                <a href="single-product-carousel.html">
                                  Single Product Carousel
                                </a>
                              </li>
                              <li>
                                <a href="single-product-gallery-left.html">
                                  Single Product Gallery Left
                                </a>
                              </li>
                              <li>
                                <a href="single-product-gallery-right.html">
                                  Single Product Gallery Right
                                </a>
                              </li>
                              <li>
                                <a href="single-product-tab-style-top.html">
                                  Single Product Tab Style Top
                                </a>
                              </li>
                              <li>
                                <a href="single-product-tab-style-left.html">
                                  Single Product Tab Style Left
                                </a>
                              </li>
                              <li>
                                <a href="single-product-tab-style-right.html">
                                  Single Product Tab Style Right
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="single-product.html">Single Products</a>
                            <ul>
                              <li>
                                <a href="single-product.html">Single Product</a>
                              </li>
                              <li>
                                <a href="single-product-sale.html">
                                  Single Product Sale
                                </a>
                              </li>
                              <li>
                                <a href="single-product-group.html">
                                  Single Product Group
                                </a>
                              </li>
                              <li>
                                <a href="single-product-normal.html">
                                  Single Product Normal
                                </a>
                              </li>
                              <li>
                                <a href="single-product-affiliate.html">
                                  Single Product Affiliate
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li class="dropdown-holder">
                        <a href="blog-left-sidebar.html">Blog</a>
                        <ul class="hb-dropdown">
                          <li class="sub-dropdown-holder">
                            <a href="blog-left-sidebar.html">Blog Grid View</a>
                            <ul class="hb-dropdown hb-sub-dropdown">
                              <li>
                                <a href="blog-2-column.html">Blog 2 Column</a>
                              </li>
                              <li>
                                <a href="blog-3-column.html">Blog 3 Column</a>
                              </li>
                              <li>
                                <a href="blog-left-sidebar.html">
                                  Grid Left Sidebar
                                </a>
                              </li>
                              <li>
                                <a href="blog-right-sidebar.html">
                                  Grid Right Sidebar
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li class="sub-dropdown-holder">
                            <a href="blog-list-left-sidebar.html">
                              Blog List View
                            </a>
                            <ul class="hb-dropdown hb-sub-dropdown">
                              <li>
                                <a href="blog-list.html">Blog List</a>
                              </li>
                              <li>
                                <a href="blog-list-left-sidebar.html">
                                  List Left Sidebar
                                </a>
                              </li>
                              <li>
                                <a href="blog-list-right-sidebar.html">
                                  List Right Sidebar
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li class="sub-dropdown-holder">
                            <a href="blog-details-left-sidebar.html">
                              Blog Details
                            </a>
                            <ul class="hb-dropdown hb-sub-dropdown">
                              <li>
                                <a href="blog-details-left-sidebar.html">
                                  Left Sidebar
                                </a>
                              </li>
                              <li>
                                <a href="blog-details-right-sidebar.html">
                                  Right Sidebar
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li class="sub-dropdown-holder">
                            <a href="blog-gallery-format.html">Blog Format</a>
                            <ul class="hb-dropdown hb-sub-dropdown">
                              <li>
                                <a href="blog-audio-format.html">
                                  Blog Audio Format
                                </a>
                              </li>
                              <li>
                                <a href="blog-video-format.html">
                                  Blog Video Format
                                </a>
                              </li>
                              <li>
                                <a href="blog-gallery-format.html">
                                  Blog Gallery Format
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li class="catmenu-dropdown megamenu-static-holder">
                        <a href="index.html">Pages</a>
                        <ul class="megamenu hb-megamenu">
                          <li>
                            <a href="blog-left-sidebar.html">Blog Layouts</a>
                            <ul>
                              <li>
                                <a href="blog-2-column.html">Blog 2 Column</a>
                              </li>
                              <li>
                                <a href="blog-3-column.html">Blog 3 Column</a>
                              </li>
                              <li>
                                <a href="blog-left-sidebar.html">
                                  Grid Left Sidebar
                                </a>
                              </li>
                              <li>
                                <a href="blog-right-sidebar.html">
                                  Grid Right Sidebar
                                </a>
                              </li>
                              <li>
                                <a href="blog-list.html">Blog List</a>
                              </li>
                              <li>
                                <a href="blog-list-left-sidebar.html">
                                  List Left Sidebar
                                </a>
                              </li>
                              <li>
                                <a href="blog-list-right-sidebar.html">
                                  List Right Sidebar
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="blog-details-left-sidebar.html">
                              Blog Details Pages
                            </a>
                            <ul>
                              <li>
                                <a href="blog-details-left-sidebar.html">
                                  Left Sidebar
                                </a>
                              </li>
                              <li>
                                <a href="blog-details-right-sidebar.html">
                                  Right Sidebar
                                </a>
                              </li>
                              <li>
                                <a href="blog-audio-format.html">
                                  Blog Audio Format
                                </a>
                              </li>
                              <li>
                                <a href="blog-video-format.html">
                                  Blog Video Format
                                </a>
                              </li>
                              <li>
                                <a href="blog-gallery-format.html">
                                  Blog Gallery Format
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="index.html">Other Pages</a>
                            <ul>
                              <li>
                                <a href="login-register.html">My Account</a>
                              </li>
                              <li>
                                <a href="checkout.html">Checkout</a>
                              </li>
                              <li>
                                <a href="compare.html">Compare</a>
                              </li>
                              <li>
                                <a href="wishlist.html">Wishlist</a>
                              </li>
                              <li>
                                <a href="shopping-cart.html">Shopping Cart</a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="index.html">Other Pages 2</a>
                            <ul>
                              <li>
                                <a href="contact.html">Contact</a>
                              </li>
                              <li>
                                <a href="about-us.html">About Us</a>
                              </li>
                              <li>
                                <a href="faq.html">FAQ</a>
                              </li>
                              <li>
                                <a href="404.html">404 Error</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="about-us.html">About Us</a>
                      </li>
                      <li>
                        <a href="contact.html">Contact</a>
                      </li>
                      <li>
                        <a href="shop-left-sidebar.html">Smartwatch</a>
                      </li>
                      <li>
                        <a href="shop-left-sidebar.html">Accessories</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mobile-menu-area d-lg-none d-xl-none col-12">
          <div class="container">
            <div class="row">
              <div class="mobile-menu"></div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
