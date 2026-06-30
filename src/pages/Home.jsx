import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=4")
      .then((res) => res.json())
      .then((data) => {
        setFeatured(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setLoading(false);
      });
  }, []);

  const categories = [
    { name: "Electronics", value: "electronics" },
    { name: "Jewelery", value: "jewelery" },
    { name: "Men's Clothing", value: "men's clothing" },
    { name: "Women's Clothing", value: "women's clothing" },
  ];

  return (
    <div>
      {/* Hero Section — stays dark in both themes, like the navbar */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          color: "white",
          padding: "80px 32px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "800",
            marginBottom: "16px",
            letterSpacing: "-1px",
          }}
        >
          Shop the <span style={{ color: "#e94560" }}>Latest</span> Trends
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.7)",
            maxWidth: "500px",
            margin: "0 auto 32px",
          }}
        >
          Discover thousands of products at unbeatable prices. Quality you can
          trust.
        </p>

        <button
          onClick={() => navigate("/products")}
          style={{
            background: "#e94560",
            color: "#fff",
            border: "none",
            padding: "14px 36px",
            borderRadius: "30px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(233,69,96,0.4)",
          }}
        >
          Shop Now →
        </button>
      </div>

      {/* Categories */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap",
          padding: "32px",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() =>
              navigate(
                `/products?category=${encodeURIComponent(cat.value)}`
              )
            }
            style={{
              padding: "10px 20px",
              borderRadius: "30px",
              border: "1px solid var(--border-color)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              cursor: "pointer",
              transition: "0.2s",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#e94560";
              e.target.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "var(--bg-card)";
              e.target.style.color = "var(--text-primary)";
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Featured Products */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "48px 32px",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "700",
            marginBottom: "24px",
            color: "var(--text-primary)",
          }}
        >
          Featured Products
        </h2>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", color: "var(--text-muted)" }}>
            <p style={{ fontSize: "30px" }}>⏳</p>
            <p>Loading products...</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "24px",
            }}
          >
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button
            onClick={() => navigate("/products")}
            style={{
              padding: "12px 32px",
              border: "2px solid var(--text-primary)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              borderRadius: "30px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            View All Products →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;