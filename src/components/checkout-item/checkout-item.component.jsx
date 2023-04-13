import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart, clearItemFromCart, removeItemFromCart } from "../../store/cart/cart.action";

import { 
    CheckoutItemContainer,
    ImageContainer,
    Attribute,
    Quantity,
    RemoveButton
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img  src={imageUrl} alt={name}/>
            </ImageContainer>
            <Attribute>{ name }</Attribute>
            <Quantity>
                <div className="arrow" onClick={removeItemHandler}>&#10094;</div>
                <span className="value">{ quantity }</span>
                <div className="arrow" onClick={addItemHandler}>&#10095;</div>
            </Quantity>
            <Attribute>{ price }</Attribute>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
};

export default CheckoutItem;