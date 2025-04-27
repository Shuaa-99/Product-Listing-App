import React from "react";
import "./ProductCard.scss";

const ProductCard = ({ product, isSelected, onSelect }) => {
  return (
    <div
      className={`product-card ${isSelected ? "selected" : ""}`}
      onClick={onSelect}
    >
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <p>⭐ {product.rating}</p>
    </div>
  );
};

export default ProductCard;
