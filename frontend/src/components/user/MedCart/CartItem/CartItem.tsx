import { Button } from '@mui/material';
import { CartItemType } from '../../Dashboards/Pharmacist/Medicines/allmedicines';
import { Wrapper } from './CartItem.styles';

type Props = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
    <Wrapper>
        <div>
            <h3>{item.medicineName}</h3>
            <div className="information">
                <p>Price: ${item.priceofonemedicineinTablet}</p>
                <p>Total: ${(item.amount * item.priceofonemedicineinTablet).toFixed(2)}</p>
            </div>
            <div className="buttons">
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={() => removeFromCart(item.medicineID)}
                >
                    -
                </Button>
                <p>{item.amount}</p>
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={() => addToCart(item)}
                >
                    +
                </Button>
            </div>
        </div>
       
    </Wrapper>
);

export default CartItem;
