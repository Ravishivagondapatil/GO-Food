import React, { useState, useRef, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let options = props.options;
  let priceOptions = Object.keys(options);
  const foodItem = props.foodItem; // Ensure you're passing `foodItem` as a prop
  let data = useCart();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();
  const dispatch = useDispatchCart();

  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value); // Initialize size with the default option
  }, []);

  const handleAddToCart = async () => {
    let food = data.find(
      (item) => item.id === foodItem._id && item.size === size
    );

    if (food) {
      // If the item with the same size already exists in the cart, update its quantity
      await dispatch({
        type: "UPDATE",
        id: foodItem._id,
        size: size,
        qty: food.qty + qty, // Increment the quantity
        price: (food.qty + qty) * parseInt(options[size]), // Recalculate the price
      });
    } else {
      // If the item doesn't exist in the cart, add a new entry
      await dispatch({
        type: "ADD",
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
        img: foodItem.img,
      });
    }
  };

  return (
    <div>
      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
        <img
          src={foodItem.img}
          className="card-img-top"
          alt={foodItem.name}
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{foodItem.name}</h5>
          <div className="container w-108 p-0">
            <select
              className="m-2 h-100 bg-success rounded"
              onChange={(e) => setQty(parseInt(e.target.value))}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <select
              className="m-2 h-100 bg-success rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((i) => {
                return (
                  <option key={i} value={i}>
                    {i}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
            <hr />
            <button
              className="btn btn-success justify-center ms-2"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
