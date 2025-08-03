import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        margin: "10px",
        textAlign: "center",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", maxWidth: "200px" }}
      />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <Link to={`/products/${product.id}`}>View Details</Link>
    </div>
  );
}
