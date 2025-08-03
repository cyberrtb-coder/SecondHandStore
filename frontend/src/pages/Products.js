import React from "react";
import products from "../data";
import ProductCard from "../components/ProductCard";

export default function Products() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
