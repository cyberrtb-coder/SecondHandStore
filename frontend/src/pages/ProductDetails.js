import React from "react";
import { useParams } from "react-router-dom";
import products from "../data";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <h2>Product not found!</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} style={{ width: "300px" }} />
      <p>{product.description}</p>
      <p>
        <strong>${product.price}</strong>
      </p>
    </div>
  );
}
