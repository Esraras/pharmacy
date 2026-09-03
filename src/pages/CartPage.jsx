import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartItem,
  checkoutCart,
} from "../redux/cart/operations";
import { selectCartItems } from "../redux/cart/selectors";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems) || [];

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const subtotal = items.reduce((acc, item) => {
    const price = item.product?.price || 0;
    const quantity = item.quantity || 0;
    return acc + price * quantity;
  }, 0);

  // Miktar artırma / azaltma işlemi
  const handleQuantityChange = (productId, change) => {
    dispatch(updateCartItem({ productId, quantity: change }));
  };

  const handleRemoveItem = (productId, currentQuantity) => {
    dispatch(updateCartItem({ productId, quantity: -currentQuantity }));
  };

  const handleClearCart = async () => {
    try {
      const promises = items.map((item) => {
        const productId =
          typeof item.product === "object" ? item.product?._id : item.product;

        if (productId) {
          return dispatch(
            updateCartItem({ productId, quantity: -item.quantity }),
          ).unwrap();
        }
        return Promise.resolve();
      });

      await Promise.all(promises);
      toast.success("Cart cleared");
    } catch (err) {
      console.error("Clear cart failed:", err);
      toast.error("Failed to clear cart");
    }
  };

  const handleCheckout = async () => {
    try {
      const formattedItems = items.map((i) => {
        const pId = typeof i.product === "object" ? i.product?._id : i.product;
        return {
          productId: pId,
          quantity: i.quantity,
          // Eğer Order modeliniz fiyat bekliyorsa:
          price: i.product?.price || 0,
        };
      });

      const orderData = {
        items: formattedItems,
        total: Number(subtotal.toFixed(2)),
        shippingInfo: {
          name: "Standard User",
          email: "user@example.com",
          phone: "1234567890",
          address: "Default Address",
        },
        paymentMethod: "Cash On Delivery",
      };

      await dispatch(checkoutCart(orderData)).unwrap();
      toast.success("Checkout successful");
    } catch (err) {
      console.error("Checkout failed:", err);
      toast.error(
        typeof err === "string" ? err : "Checkout failed, please try again.",
      );
    }
  };

  if (items.length === 0) {
    return (
      <div
        className="container"
        style={{ padding: "60px 0", textAlign: "center" }}
      >
        <p
          style={{
            color: "#10b981",
            fontWeight: "bold",
            fontSize: "14px",
            textTransform: "uppercase",
          }}
        >
          YOUR BASKET
        </p>
        <h1 style={{ fontSize: "36px", margin: "8px 0 24px" }}>Cart</h1>
        <p style={{ color: "#6b7280" }}>
          Your cart is empty. Add some products to continue shopping.
        </p>
      </div>
    );
  }

  return (
    <div
      className="container"
      style={{ padding: "40px 20px", maxWidth: "1100px", margin: "0 auto" }}
    >
      <div style={{ marginBottom: "24px" }}>
        <p
          style={{
            color: "#10b981",
            fontWeight: "bold",
            fontSize: "12px",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          YOUR BASKET
        </p>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            margin: "4px 0 0 0",
            color: "#111827",
          }}
        >
          Cart
        </h1>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "32px",
          alignItems: "start",
        }}
      >
        <div>
          {items.map((item) => {
            const product = item.product || {};
            const itemPrice = (product.price || 0) * item.quantity;

            return (
              <div
                key={product._id || Math.random()}
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "20px",
                  marginBottom: "16px",
                  display: "flex",
                  gap: "20px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                  position: "relative",
                }}
              >
                <img
                  src={product.photo || "https://via.placeholder.com/100"}
                  alt={product.name}
                  style={{
                    width: "90px",
                    height: "90px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    background: "#e5e7eb",
                  }}
                />

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        margin: "0 0 4px 0",
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#111827",
                      }}
                    >
                      {product.name || "Unknown Product"}
                    </h3>
                    <p
                      style={{
                        margin: "0 0 12px 0",
                        fontSize: "13px",
                        color: "#6b7280",
                      }}
                    >
                      {product.category || "Supplements"}
                    </p>
                  </div>

                  {/* Adet Kontrol Butonları (- 1 +) */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      background: "#f3f4f6",
                      borderRadius: "8px",
                      padding: "4px 10px",
                      gap: "12px",
                      width: "fit-content",
                    }}
                  >
                    <button
                      onClick={() => handleQuantityChange(product._id, -1)}
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#374151",
                      }}
                    >
                      -
                    </button>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#111827",
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(product._id, 1)}
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#374151",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Fiyat ve Remove Butonu */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#111827",
                    }}
                  >
                    ${itemPrice.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleRemoveItem(product._id, item.quantity)}
                    style={{
                      background: "#f3f4f6",
                      border: "none",
                      borderRadius: "8px",
                      padding: "6px 14px",
                      fontSize: "12px",
                      fontWeight: "500",
                      color: "#374151",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sağ Taraf: Order Summary Panel */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              margin: "0 0 20px 0",
              color: "#111827",
            }}
          >
            Order summary
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "12px",
              fontSize: "14px",
              color: "#4b5563",
            }}
          >
            <span>Subtotal</span>
            <span style={{ fontWeight: "600", color: "#111827" }}>
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
              fontSize: "14px",
              color: "#4b5563",
            }}
          >
            <span>Delivery</span>
            <span style={{ color: "#10b981", fontWeight: "600" }}>Free</span>
          </div>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #f3f4f6",
              margin: "16px 0",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "24px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#111827",
            }}
          >
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            style={{
              width: "100%",
              backgroundColor: "#10b981",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              padding: "12px",
              fontWeight: "600",
              fontSize: "14px",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            Checkout
          </button>

          <button
            onClick={handleClearCart}
            style={{
              width: "100%",
              backgroundColor: "#f3f4f6",
              color: "#374151",
              border: "none",
              borderRadius: "10px",
              padding: "12px",
              fontWeight: "500",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Clear cart
          </button>
        </div>
      </div>
    </div>
  );
};
