import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <div className="app">
        <header>
          <h1>🛍️ Online Shopping Cart</h1>
          <p>React State Management Project</p>
        </header>

        <main>
          <ProductList />
          <Cart />
        </main>
      </div>
    </CartProvider>
  );
}

export default App;