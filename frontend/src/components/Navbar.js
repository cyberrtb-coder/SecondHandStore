import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#222", color: "#fff" }}>
      <Link to="/" style={{ marginRight: "20px", color: "#fff" }}>
        Home
      </Link>
      <Link to="/products" style={{ marginRight: "20px", color: "#fff" }}>
        Products
      </Link>
      <Link to="/cart" style={{ marginRight: "20px", color: "#fff" }}>
        Cart
      </Link>
      <Link to="/admin" style={{ color: "#fff" }}>
        Admin
      </Link>
    </nav>
  );
}
