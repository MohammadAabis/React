import React from "react";

class CartHelper extends React.Component {
  addItemsToCart = (id) => {
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
}

export default CartHelper;
