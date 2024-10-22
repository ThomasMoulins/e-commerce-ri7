// Navbar.js
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "./CartContext";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  const [isCategoriesLoaded, setIsCategoriesLoaded] = useState(false);
  const [categoriesError, setCategoriesError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then(
        (result) => {
          setCategories(result);
          setIsCategoriesLoaded(true);
        },
        (error) => {
          console.error(
            "Erreur lors de la récupération des catégories :",
            error
          );
          setCategoriesError(error);
          setIsCategoriesLoaded(true);
        }
      );
  }, []);

  const Nav = styled.nav`
    background-color: #333;
    padding: 1rem;
    color: #fff;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    z-index: 1000;
  `;

  const LeftSection = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    padding-left: 2rem;
  `;

  const CenterSection = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
  `;

  const RightSection = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    padding-right: 2rem;
  `;

  const CategoryLinks = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  `;

  const CategoryLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    margin: 0 8px;
    white-space: nowrap;
    &:hover {
      text-decoration: underline;
    }
  `;

  const CartIcon = styled(Link)`
    position: relative;
    color: #fff;
    text-decoration: none;
    font-size: 24px;
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
      <LeftSection>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          Shop
        </Link>
      </LeftSection>
      <CenterSection>
        <CategoryLinks>
          {isCategoriesLoaded ? (
            categoriesError ? (
              <div>Erreur lors du chargement des catégories.</div>
            ) : (
              categories.map((category) => (
                <CategoryLink key={category} to={`/category/${category}`}>
                  {category}
                </CategoryLink>
              ))
            )
          ) : (
            <div>Chargement des catégories...</div>
          )}
        </CategoryLinks>
      </CenterSection>
      <RightSection>
        <CartIcon to="/cart">
          🛒
          {cartItems.length > 0 && (
            <CartCount>
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </CartCount>
          )}
        </CartIcon>
      </RightSection>
    </Nav>
  );
};

export default Navbar;