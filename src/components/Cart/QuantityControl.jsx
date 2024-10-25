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

const QuantityInput = styled.input`
  background-color: inherit;
  margin: 0 8px;
  font-size: 16px;
  width: 60px;
  text-align: center;
  border: 1px solid #ddd;
  padding: 4px 8px;
  border-radius: 4px;
  &:disabled {
    color: inherit;
  }
`;

const QuantityControl = ({ quantity, onDecrease, onIncrease, maxQuantity }) => {
  return (
    <QuantityWrapper>
      <QuantityButton onClick={onDecrease} disabled={quantity <= 1}>
        -
      </QuantityButton>
      <QuantityInput
        type="text"
        min="1"
        max={maxQuantity}
        value={quantity}
        disabled
      />
      <QuantityButton onClick={onIncrease} disabled={quantity >= maxQuantity}>
        +
      </QuantityButton>
    </QuantityWrapper>
  );
};

export default QuantityControl;
