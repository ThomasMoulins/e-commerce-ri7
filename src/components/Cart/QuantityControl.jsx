import styled from "styled-components";

const QuantityWrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  background-color: transparent;
  color: #007bff;
  border: 1px solid #007bff;
  padding: 0;
  width: 32px;
  height: 32px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #007bff;
    color: #fff;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  margin: 0 8px;
  font-size: 16px;
  min-width: 32px;
  text-align: center;
  border: 1px solid #ddd;
  padding: 4px 8px;
  border-radius: 4px;
`;

const QuantityControl = ({ quantity, onDecrease, onIncrease }) => {
  return (
    <QuantityWrapper>
      <QuantityButton onClick={onDecrease} disabled={quantity <= 1}>
        -
      </QuantityButton>
      <QuantityDisplay>{quantity}</QuantityDisplay>
      <QuantityButton onClick={onIncrease}>+</QuantityButton>
    </QuantityWrapper>
  );
};

export default QuantityControl;
