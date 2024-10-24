import styled from "styled-components";
import { useContext } from "react";
import { StockContext } from "./StockContext";

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

const StockInfo = styled.p`
  font-size: 2rem;
  color: #555;
  margin: 8px 0;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; /* Centre les boutons horizontalement */
  align-items: center; /* Centre les boutons verticalement si nécessaire */
`;

const StockButton = styled.button`
  background-color: #0083ce;
  color: #fff;
  border: none;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  margin-top: 8px;
  margin-left: 1rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem; /* Ajustez cette valeur si nécessaire */
  border-radius: 4px;
  text-align: center;

  &:hover {
    background-color: #276897;
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

const StockCard = ({ products }) => {
  const { stockLevels, updateStock } = useContext(StockContext);

  if (!Array.isArray(products)) {
    return <p>No products available</p>;
  }

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
              <StockInfo>
                {stock > 0 ? (
                  <span>{stock}</span>
                ) : (
                  <span style={{ color: "red" }}>En rupture de stock</span>
                )}
              </StockInfo>
              <ButtonContainer>
                <StockButton
                  onClick={() => updateStock(product.id, stock - 1)}
                  disabled={stock === 0}
                >
                  -
                </StockButton>
                <StockButton onClick={() => updateStock(product.id, stock + 1)}>
                  +
                </StockButton>
              </ButtonContainer>
            </Card>
          );
        })}
      </CardContainer>
    );
  }
};

export default StockCard;
