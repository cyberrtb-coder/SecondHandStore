import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={styles.container}>
      <h1>Welcome to the Home Page</h1>
      <p>This is the starting page of your SecondHandStore app.</p>

      <nav style={styles.nav}>
        <Link to="/about" style={styles.link}>
          Go to About Page →
        </Link>
      </nav>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  nav: {
    marginTop: "20px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontSize: "18px",
  },
};
