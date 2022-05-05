import useForm from './hooks/useForm.js';
import { usernamePattern, emailPattern, passwordPattern } from './patterns.js';

const { useState, useRef, useEffect } = React;

const Loader = ({ i }) => 
    <div class="form-button-loading" style={{ animationDelay: `${i * 200}ms` }} />;

const Loaders = () => (
    <div class="form-loaders">
        { [...Array(3).keys()].map(i => <Loader i={i} />) }
    </div>
)

const CredentialsForm = ({ next }) => {
    const { 
        valid, 
        errorMsg,
        invalidate, 
        register, 
        watch, 
        handleSubmit 
    } = useForm({ username: "", email: "", password: "" });

    const [loading, setLoading] = useState(false);

    const button = useRef(null);
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
        setLoading(true);

        fetchAvailable(credentials)
            .then(({ username, email }) => {
                if (!username) invalidate("username", "Username already exists");
                if (!email) invalidate("email", "Email address in use");

                setLoading(false);

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
                       { ...register("username", { 
                           required: true, 
                           pattern: usernamePattern,
                           errorMsg: "Username must containt at least 6 characters"
                       })} />
                <p className={`${valid("username") ? "hide" : "show" }`}>
                    { errorMsg("username") }
                </p>
            </div>
            <div class="form-field">
                <label for="email">Email</label>
                <input type="email" name="email" 
                       { ...register("email", { 
                           required: true, 
                           pattern: emailPattern,
                           errorMsg: "Invalid email address"
                       })} />
                <p className={`${valid("email") ? "hide" : "show" }`}>
                    { errorMsg("email") }
                </p>
            </div>
            <div class="form-field">
                <label for="password">Password</label>
                <input type="password" name="password" 
                       { ...register("password", { 
                           required: true, 
                           pattern: passwordPattern,
                           errorMsg: "Password must contain at least 6 characters" 
                       })} />
                <p className={`${valid("password") ? "hide" : "show" }`}>
                    { errorMsg("password") }
                </p>
            </div>
            <div class="form-button-wrapper">
                <button disabled ref={button} className={`${loading ? "loading" : ""}`}>
                    { loading ? <Loaders /> : "Next" }
                </button>
            </div>
        </form>
    )
}

export default CredentialsForm
