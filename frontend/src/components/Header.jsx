import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  CartStateContext,
  CartDispatchContext,
  toggleCartPopup
} from "../contexts/cart";
import { CommonDispatchContext, setSearchKeyword } from "../contexts/common";
import CartPreview from "../components/CartPreview";

const Header = (props) => {
  const { items: cartItems, isCartOpen } = useContext(CartStateContext);
  const commonDispatch = useContext(CommonDispatchContext);
  const cartDispatch = useContext(CartDispatchContext);
  const cartQuantity = cartItems.length;
  const cartTotal = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((prev, current) => prev + current, 0);

  const handleSearchInput = async () => {
    const word = document.getElementById("searchBar").value;
    const url = "/search";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: word })
    };
    await fetch(url, requestOptions)
    .then((res) => res.json()).then(data=>{
      return data.length>0? setSearchKeyword(commonDispatch, data[0].name): alert("Item not found!")
    })
  };

  const handleReset = ()=>{
    return setSearchKeyword(commonDispatch, "");
  }

  const handleCartButton = (event) => {
    event.preventDefault();
    return toggleCartPopup(cartDispatch);
  };

  return (
    <header>
      <div className="container">
        <div className="brand">
          <Link to="/" onClick={handleReset}>
            <img
              className="logo"
              src="https://i.ibb.co/zNJ1p6d/KAImono-1920-x-720-px.png"
              alt="Kaimono Logo"
            />
          </Link>
        </div>

        <div className="search">
          <form action="#" method="get" className="search-form">
            <input
              type="search"
              placeholder="Search for Vegetables and Fruits"
              className="search-keyword"
              id="searchBar"
            />
            <button
              className="search-button"
              type="button"
              onClick={handleSearchInput}
              // onClick={this.handleSubmit.bind(this)}
            />
          </form>
        </div>

        <div className="cart">
          <div className="cart-info">
            <table>
              <tbody>
                <tr>
                  <td>No. of items</td>
                  <td>:</td>
                  <td>
                    <strong>{cartQuantity}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Sub Total</td>
                  <td>:</td>
                  <td>
                    <strong>{cartTotal}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <a className="cart-icon" href="#" onClick={handleCartButton}>
            <img
              className={props.cartBounce ? "tada" : " "}
              src="https://res.cloudinary.com/sivadass/image/upload/v1493548928/icons/bag.png"
              alt="Cart"
            />
            {cartQuantity ? (
              <span className="cart-count">{cartQuantity}</span>
            ) : (
              ""
            )}
          </a>
          <CartPreview />
        </div>
      </div>
    </header>
  );
};

export default Header;
