import { useState } from "react";
import spool from "../../img/spool.png";
import css from "./SpoolCard.module.css";
import sprite from "../../img/sprite.svg";

export const SpoolCard = ({
  color,
  quantity,
  onIncrease,
  onDecrease,
  onSetQuantity,
}) => {
  const [inputValue, setInputValue] = useState(quantity);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const newQuantity = parseInt(inputValue, 10);
      if (!isNaN(newQuantity) && newQuantity >= 0) {
        onSetQuantity(newQuantity);
      } else {
        setInputValue(quantity); // reset invalid input
      }
    }
  };

  const handleBlur = async () => {
    // When input loses focus, attempt to update the backend with the new quantity
    const newQuantity = parseInt(inputValue, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      try {
        const response = await fetch("http://localhost:3001/update-spool", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            index: 0, // Use the appropriate index for this spool
            quantity: newQuantity,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update spool quantity");
        }

        // Optional: Update the parent component state with the new quantity
        onSetQuantity(newQuantity);
      } catch (error) {
        console.error("Error updating spool:", error);
      }
    } else {
      setInputValue(quantity); // Reset input to original quantity if the input is invalid
    }
  };

  return (
    <div className={css.SpoolCard}>
      <img src={spool} alt="Spool of filament" />
      <div className={css.RightBox}>
        <h2 className={css.SpoolName}>
          {color} x {quantity} pcs
        </h2>
        <div className={css.ButtonBox}>
          <button className={`${css.Button} ${css.Plus}`} onClick={onIncrease}>
            <svg className={css.plusIcon}>
              <use href={`${sprite}#add`}></use>
            </svg>
          </button>
          <input
            type="number"
            value={inputValue}
            className={css.InputBox}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            onBlur={handleBlur} // Trigger update when input loses focus
            min="0"
          />
          <button className={`${css.Button} ${css.Minus}`} onClick={onDecrease}>
            <svg className={css.minusIcon}>
              <use href={`${sprite}#minus`}></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
