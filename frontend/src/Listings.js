import { useEffect, useState } from "react";

export default function Listings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch("/api/listings")
      .then((res) => res.json())
      .then((data) => setListings(data));
  }, []);

  return (
    <div>
      <h2>Available Listings</h2>
      <ul>
        {listings.map((item) => (
          <li key={item._id}>
            {item.title} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
