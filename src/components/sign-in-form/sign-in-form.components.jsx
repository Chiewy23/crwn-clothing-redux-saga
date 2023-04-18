import { useState } from "react";
import { SignUpContainer, ButtonsContainer } from "./sign-in-form.styles";
import { useDispatch } from "react-redux";
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

const defaultFormFields = {
    email: "",
    password: ""
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const dispatch = useDispatch();

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();

        } catch(error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("Incorrect password or email");
                    break;
                case "auth/user-not-found":
                    alert("Incorrect password or email");
                    break;
                default:
                    alert(`Error occured when signing in - ${error}`);
                    break;
            }

            return;
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return (
        <SignUpContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email & password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={ BUTTON_TYPE_CLASSES.google } onClick={signInWithGoogle}>Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignUpContainer>
    );
}

export default SignInForm;