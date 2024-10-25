// React
import { useContext, useState, useEffect, useCallback } from "react";
// Contexte
import { ThemeContext } from "./ThemeContext";
import { ProductsContext } from "./Stock/ProductsContext";
import { CartContext } from "./Cart/CartContext";
// Externe
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { debounce } from "lodash";

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
  flex: 4;
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

const ThemeToggleButton = styled.button`
  padding: 0;
  position: relative;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 24px;
  margin-right: 5%;
  margin-left: 5%;
  &:hover {
    opacity: 0.8;
  }
`;

const CartIcon = styled(Link)`
  position: relative;
  color: #fff;
  text-decoration: none;
  font-size: 24px;
  margin-right: 5%;
  margin-left: 5%;
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

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border-radius: 4px;
  border: none;
  font-size: 1rem;
`;

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { cartItems } = useContext(CartContext);
  const { setSearchQuery } = useContext(ProductsContext);
  const [categories, setCategories] = useState([]);
  const [isCategoriesLoaded, setIsCategoriesLoaded] = useState(false);
  const [categoriesError, setCategoriesError] = useState(null);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const location = useLocation();

  // Débounce de 100 ms
  const debouncedSetSearchQuery = useCallback(
    debounce((query) => {
      setSearchQuery(query);
    }, 100),
    [setSearchQuery]
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setLocalSearchQuery(query);
    debouncedSetSearchQuery(query);
  };

  useEffect(() => {
    setSearchQuery("");
    setLocalSearchQuery("");
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
  }, [location.pathname]);

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
        {/* Barre de recherche */}
        <SearchForm onSubmit={(e) => e.preventDefault()}>
          <SearchInput
            type="text"
            placeholder="Rechercher..."
            value={localSearchQuery}
            onChange={handleSearchChange}
          />
        </SearchForm>
      </CenterSection>
      <RightSection>
        <ThemeToggleButton onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? "🌙" : "☀️"}
        </ThemeToggleButton>
        <CartIcon to="/stock" aria-label="Stock">
          📦
        </CartIcon>
        <CartIcon to="/cart" aria-label="Panier">
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
