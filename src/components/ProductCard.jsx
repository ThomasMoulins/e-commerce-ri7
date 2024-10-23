import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./Cart/CartContext";
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
  height: 6rem;
  font-size: 18px;
  margin: 0;
  margin-bottom: 8px;
  color: #333;
  text-align: start;
  display: flex;
  align-items: center;
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
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ProductCard = ({ products }) => {
  const { addToCart } = useContext(CartContext);

  if (!Array.isArray(products)) {
    return <p>No products available</p>;
  }

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.title} a été ajouté au panier !`);
  };

  return (
    <CardContainer>
      {products.map((product) => (
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
          <AddToCartButton onClick={() => handleAddToCart(product)}>
            Ajouter au Panier
          </AddToCartButton>
        </Card>
      ))}
    </CardContainer>
  );
};

export default ProductCard;
