import "./App.css";
import products from "./data/products";
import { useState, useEffect } from "react";

function App() {
  const [price, setPrice] = useState(0);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (item) => {
    const arrayOfId = cart.map((item) => item.id);
    if (arrayOfId.includes(item.id)) {
      item.quantity++;
      const newCart = [...cart];
      setCart(newCart);
    } else {
      item.quantity = 1;
      const newCart = [...cart, item];
      setCart(newCart);
    }
  };

  const handleDeleteCartItem = (index) => {
    const newCart = cart.filter((item, itemIndex) => index !== itemIndex);
    setCart(newCart);
  };

  const handleAddQuantity = (item) => {
    item.quantity++;
    const newcart = [...cart];
    setCart(newcart);
    console.log("handleAddQuantity");
  };
  const handleDeleteQuantity = (item, index) => {
    if (item.quantity > 1) {
      item.quantity--;
      const newCart = [...cart];
      setCart(newCart);
    } else {
      const newCart = cart.filter((item, itemIndex) => index !== itemIndex);
      setCart(newCart);
    }
  };

  const calculateTotalPrice = (item) => {
    const multi = (accumulator, currentValue) => {
      console.log(accumulator, "accumulator");
      console.log(currentValue, "currentValue");
      return currentValue.quantity * currentValue.price + accumulator;
    };
    const total = cart.reduce(multi, 0);
    setPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [cart]);

  return (
    <div className="App">
      <section className="product-container">
        <h1 className="product-heading">Products</h1>
        <div className="product-list">
          {products.slice(0, 5).map((item) => {
            return (
              <div className="product" key={item.id}>
                <img src={item.image} alt={item.name} />
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <button onClick={() => handleAddToCart(item)}>
                  Add to cart
                </button>
              </div>
            );
          })}
        </div>
      </section>
      <hr />

      <section className="cart">
        <h1 className="cart-heading">Cart Total Price is {price} Baht</h1>
        <div className="cart-item-list">
          {cart.map((product, index) => {
            return (
              <div className="cart-item" key={index}>
                <h1>Item name: {product.name}</h1>
                <h2>Price: {product.price}</h2>
                <h2>Quantity: {product.quantity}</h2>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteCartItem(index)}
                >
                  x
                </button>
                <div className="quantity-actions">
                  <button
                    className="add-quantity"
                    onClick={() => handleAddQuantity(product)}
                  >
                    +
                  </button>
                  <button
                    className="subtract-quantity"
                    onClick={() => handleDeleteQuantity(product, index)}
                  >
                    -
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
