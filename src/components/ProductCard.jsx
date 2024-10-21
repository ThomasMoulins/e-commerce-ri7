const ProductCard = ({ products }) => {
  if (!Array.isArray(products)) {
    return <p>No products available</p>;
  }

  console.log("Données reçues dans ProductCard :", products);

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "150px", height: "150px" }}
          />
          <p>
            <strong>{product.title}</strong>
          </p>
          <p>
            {new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "EUR",
            }).format(product.price)}
          </p>
          <p>{product.category}</p>
          <p>{product.description}</p>
          <br />
        </li>
      ))}
    </ul>
  );
};

export default ProductCard;
