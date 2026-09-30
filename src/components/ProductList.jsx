import products from "../data/products";
import { useCart } from "../context/CartContext";

function ProductList() {
  const { dispatch } = useCart();

  return (
    <div className="products">
      <h2>Products</h2>

      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <div className="product-image">
              {product.image}
            </div>

            <h3>{product.name}</h3>

            <p>₹{product.price}</p>

            <button
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: product
                })
              }
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;