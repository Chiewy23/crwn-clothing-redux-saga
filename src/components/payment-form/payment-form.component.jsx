import { CardElement } from "@stripe/react-stripe-js";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";

import Button from "../button/button.component";


const PaymentForm = () => {
    return (
        <div>
            <CardElement />
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</Button>
        </div>
    );
};

export default PaymentForm;