import { CartItemType } from "../../Dashboards/Pharmacist/Medicines/allmedicines";
import CartItem from "../CartItem/CartItem";
import { Wrapper } from "./Cart.styles";

import {
  useState,
  useEffect,
  submitOrder,
  Button,
  decodeToken,
  CircularProgress,
  loadStripe,
} from "../../../../sharedimports/share";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  console.log(cartItems);
  const [loading, setLoading] = useState(false);

  const [userID, setUserID] = useState<number>();

  useEffect(() => {
    const shouldDecode = true;
    const getdecodedToken = decodeToken(shouldDecode);

    if (getdecodedToken && typeof getdecodedToken === "object") {
      setUserID(getdecodedToken.id);
    }

    if (getdecodedToken == null) {
      return console.log("user not found");
    }
  }, [userID]);
  console.log("user id for ph", userID);

  const calculateTotal = (items: CartItemType[]) =>
    items.reduce(
      (ack: number, item) =>
        ack + item.amount * item.priceofonemedicineinTablet,
      0
    );

  const handleConfirmOrder = async () => {
    if (!userID) {
      console.error("User ID is undefined!");
      return;
    }
    if (cartItems.length > 0) {
      setLoading(true);
      const totalAmount = calculateTotal(cartItems);
      try {
        console.log(cartItems);
        const orderResponse = await submitOrder({
          cartItems,
          totalAmount,
          userID,
        });
        console.log(orderResponse.sessionId);
        const sessionId = orderResponse.sessionId;
        console.log(sessionId);
        const stripe = await loadStripe(
          "pk_test_51QSEck03bWGiW3VHL35BIViKpC25LeLZfvD1uIPH1naU9ZpF3q6mJe6Wwhzm93RKep1GalzEbQdo5h9N1RAdXQve00Kpay4cFv"
        );

        await stripe?.redirectToCheckout({ sessionId });
      } catch (error) {
        console.error("Error confirming order:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Cart is empty!");
      alert("Cart is Empty");
    }
  };

  return (
    <Wrapper style={{ position: "fixed", top: 100, right: 150 }}>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in the cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.medicineID}
          // key={`${item.medicineID}-${item.medicineQuantity}`}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      <Button onClick={handleConfirmOrder} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Confirm Order"}
      </Button>
    </Wrapper>
  );
};

export default Cart;
