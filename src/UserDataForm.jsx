import useForm from './hooks/useForm.js';

const { useState } = React;

const namePattern  = /^[a-z \.]+$/i;
const phonePattern = /^\d{9}$/;

const UserDataForm = ({ registerUser }) => {
    const { register, handleSubmit } = useForm({ "first-name": "", "last-name": "", "phone-number": "" });

    const onSubmit = userData =>
        registerUser(userData);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div class="form-title">
                <h1><span>Sign up</span> to our camp</h1>
            </div>
            <div class="form-field"> 
                <label for="first-name">First Name</label>
                <input type="text" name="first-name" autoFocus
                    { ...register("first-name", { pattern: namePattern }) }  />
            </div>

            <div class="form-field">
                <label for="last-name">Last Name</label>
                <input type="text" name="last-name"
                    { ...register("last-name", { pattern: namePattern }) } />
            </div>
            <div class="form-field">
                <label for="phone-number">Phone Number</label>
                <input type="tel" name="phone-number"
                    { ...register("phone-number", { pattern: phonePattern }) } />
            </div>
            <div class="form-button-wrapper">
                <button>Create Account</button>
            </div>
        </form>
    )
}

export default UserDataForm

