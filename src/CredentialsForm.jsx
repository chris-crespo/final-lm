import useForm from './hooks/useForm.js';

const { useState, useRef, useEffect } = React;

const usernamePattern = /[a-z0-9_\-]{6}/i;
const emailPattern = /[a-z0-9_\.\-]+@[a-z]+\.[a-z]+/i;
const passwordPattern = /[a-z0-9]{6}/i;

const CredentialsForm = ({ next }) => {
    const button = useRef(null);
    const { invalidate, register, watch, handleSubmit } = useForm();

    useEffect(() => {
        const listener = ({ valid }) => button.current.disabled = !valid;
        const sub = watch(listener);
        return () => sub.unsub();
    }, []);

    const fetchAvailable = ({ username, email }) => {
        const url = "https://scm-daw.herokuapp.com/api/available?";
        return fetch(`${url}username=${username}&email=${email}`)
            .then(res => res.json());
    }

    const onSubmit = credentials => {
        fetchAvailable(credentials)
            .then(({ username, email }) => {
                if (!username) invalidate("username");
                if (!email) invalidate("email");

                if (username && email)
                    next(credentials);
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div class="form-title">
                <h1><span>Sign up</span> to our camp</h1>
            </div>
            <div class="form-field">
                <label for="username">Username</label>
                <input type="text" name="username" autoFocus
                       { ...register("username", { required: true, pattern: usernamePattern })} />
            </div>
            <div class="form-field">
                <label for="email">Email</label>
                <input type="email" name="email" 
                       { ...register("email", { required: true, pattern: emailPattern }) } />
            </div>
            <div class="form-field">
                <label for="password">Password</label>
                <input type="password" name="password" 
                       { ...register("password", { required: true, pattern: passwordPattern })} />
            </div>
            <div class="form-button-wrapper">
                <button disabled ref={button}>Next</button>
            </div>
        </form>
    )
}

export default CredentialsForm
