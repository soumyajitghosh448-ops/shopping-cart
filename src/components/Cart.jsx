import { useState } from "react";
import { useCart } from "../context/CartContext";

function Cart() {
  const { state, dispatch } = useCart();

  const [couponCode, setCouponCode] = useState("");

  const subtotal = state.cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const discount = state.coupon
    ? subtotal * (state.coupon / 100)
    : 0;

  const afterDiscount = subtotal - discount;

  const gst = afterDiscount * 0.18;

  const grandTotal = afterDiscount + gst;

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "SAVE10") {
      dispatch({
        type: "APPLY_COUPON",
        payload: 10
      });

      alert("10% coupon applied!");
    } else if (couponCode.toUpperCase() === "SAVE20") {
      dispatch({
        type: "APPLY_COUPON",
        payload: 20
      });

      alert("20% coupon applied!");
    } else {
      alert("Invalid Coupon Code");
    }
  };

  return (
    <div className="cart">
      <h2>🛒 Shopping Cart</h2>

      {state.cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {state.cart.map(item => (
            <div className="cart-item" key={item.id}>
              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>

              <div className="quantity">
                <button
                  onClick={() =>
                    dispatch({
                      type: "DECREASE_QUANTITY",
                      payload: item.id
                    })
                  }
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    dispatch({
                      type: "INCREASE_QUANTITY",
                      payload: item.id
                    })
                  }
                >
                  +
                </button>
              </div>

              <p>
                ₹{item.price * item.quantity}
              </p>

              <button
                className="remove"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: item.id
                  })
                }
              >
                Remove
              </button>
            </div>
          ))}

          <div className="coupon">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={e =>
                setCouponCode(e.target.value)
              }
            />

            <button onClick={applyCoupon}>
              Apply Coupon
            </button>

            <p>
              Try: <b>SAVE10</b> or <b>SAVE20</b>
            </p>
          </div>

          <div className="summary">
            <h2>Order Summary</h2>

            <p>
              Subtotal:
              <span>₹{subtotal.toFixed(2)}</span>
            </p>

            <p>
              Discount:
              <span>- ₹{discount.toFixed(2)}</span>
            </p>

            <p>
              GST (18%):
              <span>₹{gst.toFixed(2)}</span>
            </p>

            <hr />

            <h3>
              Grand Total:
              <span>₹{grandTotal.toFixed(2)}</span>
            </h3>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;