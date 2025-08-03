import { API_BASE_URL } from "../config";

useEffect(() => {
  fetch(`${API_BASE_URL}/api/cart`)
    .then((res) => res.json())
    .then((data) => setCartItems(data))
    .catch((err) => console.error("API Error:", err));
}, []);
