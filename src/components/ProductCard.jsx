import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./Cart/CartContext";
import { StockContext } from "./Stock/StockContext";
import { toast } from "react-toastify";

const Card = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  height: auto;
  padding: 16px;
  margin: 16px;
  text-align: center;
  background-color: #fff;
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  margin-bottom: 16px;
  object-fit: scale-down;
`;

const Title = styled.h2`
  height: 5rem;
  font-size: 18px;
  margin: 0;
  margin-bottom: 8px;
  color: #333;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PriceCategoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Price = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #007b00;
  margin: 0;
`;

const Category = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0;
`;

const StockInfo = styled.p`
  font-size: 14px;
  color: #555;
  margin: 8px 0;
`;

const AddToCartButton = styled.button`
  background-color: #007b00;
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  margin-top: 8px;
  border-radius: 4px;
  &:hover {
    background-color: #005500;
  }
  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ProductCard = ({ products }) => {
  const { addToCart } = useContext(CartContext);
  const { stockLevels, updateStock } = useContext(StockContext);

  if (!Array.isArray(products)) {
    return <p>No products available</p>;
  }

  const handleAddToCart = (product, stock) => {
    addToCart(product);
    updateStock(product.id, stock - 1);
    toast.success(`${product.title} a été ajouté au panier !`);
  };

  if (!stockLevels) {
    return <div>Chargement des stocks...</div>;
  } else {
    return (
      <CardContainer>
        {products.map((product) => {
          const stock = stockLevels[product.id] || 0;

          return (
            <Card key={product.id}>
              <ProductImage src={product.image} alt={product.title} />
              <Title>{product.title}</Title>
              <PriceCategoryContainer>
                <Price>
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  }).format(product.price)}
                </Price>
                <Category>
                  <Link to={`/category/${product.category}`}>
                    {product.category}
                  </Link>
                </Category>
              </PriceCategoryContainer>
              <StockInfo>
                {stock > 0 ? (
                  <span>Stock disponible : {stock}</span>
                ) : (
                  <span style={{ color: "red" }}>En rupture de stock</span>
                )}
              </StockInfo>
              <AddToCartButton
                onClick={() => handleAddToCart(product, stock)}
                disabled={stock === 0}
              >
                Ajouter au Panier
              </AddToCartButton>
            </Card>
          );
        })}
      </CardContainer>
    );
  }
};

export default ProductCard;
