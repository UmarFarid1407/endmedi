import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { CartItemType } from "../../Dashboards/Pharmacist/Medicines/allmedicines";
import { Wrapper } from "./Item.styles";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (item.medicineQuantity <= 0) return;
    setLoading(true);
    try {
      await handleAddToCart(item);
    } catch (error) {
      console.error("Error adding to cart", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <div>
        <h3>Medicine Name: {item.medicineName}</h3>
        <p>Category: {item.medicineCategory}</p>
        <p> Available Quantity: {item.medicineQuantity} </p>
        <p>
          Quantity in one Tablet for {item.medicineName} :{" "}
          {item.medicinequantityinonetablet}{" "}
        </p>
        <h4>Price of one medicine: ${item.priceofonemedicineinTablet}</h4>
      </div>
      <Button
        onClick={handleClick}
        disabled={loading || item.medicineQuantity <= 0}
        style={{
          color: item.medicineQuantity <= 0 ? "white" : "black",
        }}
      >
        {item.medicineQuantity <= 0 ? (
          "Product Not Available"
        ) : loading ? (
          <CircularProgress size={24} />
        ) : (
          "Add to cart"
        )}
      </Button>
    </Wrapper>
  );
};

export default Item;
