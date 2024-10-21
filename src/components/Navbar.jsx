// Navbar.js
import { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);

  const Nav = styled.nav`
    background-color: #333;
    padding: 16px;
    color: #fff;
    display: flex;
    justify-content: space-between;
  `;

  const CartIcon = styled.div`
    position: relative;
    cursor: pointer;
  `;

  const CartCount = styled.span`
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: red;
    color: white;
    padding: 2px 6px;
    border-radius: 50%;
    font-size: 12px;
  `;

  return (
    <Nav>
      <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
        Shop
      </Link>
      <CartIcon>
        🛒
        {cartItems.length > 0 && <CartCount>{cartItems.length}</CartCount>}
      </CartIcon>
    </Nav>
  );
};

export default Navbar;
