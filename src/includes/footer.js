const Footer = (props) => {
  /*const person = {
    name: "Ali",
    age: 12,
    city: "Isl",
  };*/

  // console.log(props);
  //let { person, name } = props;

  return (
    <>
      <div class="footer">
        <div class="footer-static-top">
          <div class="container">
            <div class="footer-shipping pt-60 pb-55 pb-xs-25">
              <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-6 pb-sm-55 pb-xs-55">
                  <div class="li-shipping-inner-box">
                    <div class="shipping-icon">
                      <img
                        src={`${process.env.PUBLIC_URL}/img/shipping1.png`}
                        alt="Shipping Icon"
                      />
                    </div>
                    <div class="shipping-text">
                      <h2>Free Delivery</h2>
                      <p>And free returns. See checkout for delivery dates.</p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6 pb-sm-55 pb-xs-55">
                  <div class="li-shipping-inner-box">
                    <div class="shipping-icon">
                      <img
                        src={`${process.env.PUBLIC_URL}/img/shipping2.png`}
                        alt="Shipping Icon"
                      />
                    </div>
                    <div class="shipping-text">
                      <h2>Safe Payment</h2>
                      <p>
                        Pay with the world's most popular and secure payment
                        methods.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6 pb-xs-30">
                  <div class="li-shipping-inner-box">
                    <div class="shipping-icon">
                      <img
                        src={`${process.env.PUBLIC_URL}/img/shipping3.png`}
                        alt="Shipping Icon"
                      />
                    </div>
                    <div class="shipping-text">
                      <h2>Shop with Confidence</h2>
                      <p>
                        Our Buyer Protection covers your purchasefrom click to
                        delivery.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6 pb-xs-30">
                  <div class="li-shipping-inner-box">
                    <div class="shipping-icon">
                      <img
                        src={`${process.env.PUBLIC_URL}/img/shipping4.png`}
                        alt="Shipping Icon"
                      />
                    </div>
                    <div class="shipping-text">
                      <h2>24/7 Help Center</h2>
                      <p>Have a question? Call a Specialist or chat online.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-static-middle">
          <div class="container">
            <div class="footer-logo-wrap pt-50 pb-35">
              <div class="row">
                <div class="col-lg-4 col-md-6">
                  <div class="footer-logo">
                    <img
                      src={`${process.env.PUBLIC_URL}/img/1.jpg`}
                      alt="Footer Logo"
                    />
                    <p class="info">
                      We are a team of designers and developers that create high
                      quality HTML Template & Woocommerce, Shopify Theme.
                    </p>
                  </div>
                  <ul class="des">
                    <li>
                      <span>Address: </span>
                      6688Princess Road, London, Greater London BAS 23JK, UK
                    </li>
                    <li>
                      <span>Phone: </span>
                      <a href="#">(+123) 123 321 345</a>
                    </li>
                    <li>
                      <span>Email: </span>
                      <a href="mailto://info@yourdomain.com">
                        info@yourdomain.com
                      </a>
                    </li>
                  </ul>
                </div>

                <div class="col-lg-2 col-md-3 col-sm-6">
                  <div class="footer-block">
                    <h3 class="footer-block-title">Product</h3>
                    <ul>
                      <li>
                        <a href="#">Prices drop</a>
                      </li>
                      <li>
                        <a href="#">New products</a>
                      </li>
                      <li>
                        <a href="#">Best sales</a>
                      </li>
                      <li>
                        <a href="#">Contact us</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="col-lg-2 col-md-3 col-sm-6">
                  <div class="footer-block">
                    <h3 class="footer-block-title">Our company</h3>
                    <ul>
                      <li>
                        <a href="#">Delivery</a>
                      </li>
                      <li>
                        <a href="#">Legal Notice</a>
                      </li>
                      <li>
                        <a href="#">About us</a>
                      </li>
                      <li>
                        <a href="#">Contact us</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="col-lg-4">
                  <div class="footer-block">
                    <h3 class="footer-block-title">Follow Us</h3>
                    <ul class="social-link">
                      <li class="twitter">
                        <a
                          href="https://twitter.com/"
                          data-toggle="tooltip"
                          target="_blank"
                          title="Twitter"
                        >
                          <i class="fa fa-twitter"></i>
                        </a>
                      </li>
                      <li class="rss">
                        <a
                          href="https://rss.com/"
                          data-toggle="tooltip"
                          target="_blank"
                          title="RSS"
                        >
                          <i class="fa fa-rss"></i>
                        </a>
                      </li>
                      <li class="google-plus">
                        <a
                          href="https://www.plus.google.com/discover"
                          data-toggle="tooltip"
                          target="_blank"
                          title="Google +"
                        >
                          <i class="fa fa-google-plus"></i>
                        </a>
                      </li>
                      <li class="facebook">
                        <a
                          href="https://www.facebook.com/"
                          data-toggle="tooltip"
                          target="_blank"
                          title="Facebook"
                        >
                          <i class="fa fa-facebook"></i>
                        </a>
                      </li>
                      <li class="youtube">
                        <a
                          href="https://www.youtube.com/"
                          data-toggle="tooltip"
                          target="_blank"
                          title="Youtube"
                        >
                          <i class="fa fa-youtube"></i>
                        </a>
                      </li>
                      <li class="instagram">
                        <a
                          href="https://www.instagram.com/"
                          data-toggle="tooltip"
                          target="_blank"
                          title="Instagram"
                        >
                          <i class="fa fa-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="footer-newsletter">
                    <h4>Sign up to newsletter</h4>
                    <form
                      action="#"
                      method="post"
                      id="mc-embedded-subscribe-form"
                      name="mc-embedded-subscribe-form"
                      class="footer-subscribe-form validate"
                      target="_blank"
                      novalidate
                    >
                      <div id="mc_embed_signup_scroll">
                        <div
                          id="mc-form"
                          class="mc-form subscribe-form form-group"
                        >
                          <input
                            id="mc-email"
                            type="email"
                            autocomplete="off"
                            placeholder="Enter your email"
                          />
                          <button class="btn" id="mc-submit">
                            Subscribe
                          </button>
                        </div>
                      </div>
                    </form>
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

export default Footer;
