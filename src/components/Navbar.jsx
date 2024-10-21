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
    align-items: center;
  `;

  const NavLinks = styled.div`
    display: flex;
    align-items: center;
  `;

  const CartIcon = styled(Link)`
    position: relative;
    color: #fff;
    text-decoration: none;
    font-size: 24px;
    margin-left: 16px;
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
      <NavLinks>
        <CartIcon to="/cart">
          🛒
          {cartItems.length > 0 && (
            <CartCount>
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </CartCount>
          )}
        </CartIcon>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
