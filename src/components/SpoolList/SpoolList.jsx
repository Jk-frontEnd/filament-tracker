import { useState, useEffect } from "react";
import { SpoolCard } from "../SpoolCard/SpoolCard";
import css from "./SpoolList.module.css";

export const SpoolList = () => {
  const [spools, setSpools] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/public/db/spools") // Updated the endpoint to match backend route
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // 🔍 Log the response
        setSpools(data);
      })
      .catch((error) => console.error("Error fetching spools:", error));
  }, []);

  const updateQuantity = (index, delta) => {
    const updatedSpools = [...spools];
    const newQuantity = Math.max(0, spools[index].quantity + delta);

    updatedSpools[index].quantity = newQuantity;
    setSpools(updatedSpools);

    fetch("http://localhost:3001/update-spool", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index, quantity: newQuantity }),
    }).catch((error) => console.error("Error updating spool:", error));
  };

  const setQuantity = (index, newQuantity) => {
    const updatedSpools = [...spools];
    const quantity = Math.max(0, parseInt(newQuantity) || 0);

    updatedSpools[index].quantity = quantity;
    setSpools(updatedSpools);

    fetch("http://localhost:3001/update-spool", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index, quantity }),
    }).catch((error) => console.error("Error updating spool:", error));
  };

  return (
    <div className={css.SpoolList}>
      {Array.isArray(spools) ? (
        spools.map((spool, index) => (
          <SpoolCard
            key={spool.id || index}
            color={spool.color}
            quantity={spool.quantity}
            onIncrease={() => updateQuantity(index, 1)}
            onDecrease={() => updateQuantity(index, -1)}
            onSetQuantity={(newQuantity) => setQuantity(index, newQuantity)}
          />
        ))
      ) : (
        <p>Loading spools...</p>
      )}
    </div>
  );
};
