import LoginBanner from './LoginBanner.js';
import useForm from './hooks/useForm.js';
import useSessionStorage from './hooks/useSessionStorage.js';
import { emailPattern, passwordPattern } from './patterns.js';
import redirect from './redirect.js';
import { api } from './api.js';

const { useState, useRef, useEffect } = React;

const userErrorMsg = "Username or email does not exist";
const passwordErrorMsg = "Passwords do not match";

const SignIn = () => {
    const { 
        register, 
        valid,
        invalidate,
        errorMsg,
        watch,
        handleSubmit
    } = useForm({ "user": "", "password": "" });
    const [user, storeUser] = useSessionStorage("user", { "username": "", "email": "", "name": ""  });
    const [login, setLogin] = useState({ attempted: false, success: false });

    const attemptLogin = success => {
        setLogin({ attempted: true, success });
        setTimeout(() => setLogin({ attempted: false, success }), 3000);
    }

    const button = useRef(null);
    useEffect(() => {
        const listener = ({ valid }) => button.current.disabled = !valid;
        const sub = watch(listener);
        return () => sub.unsub();
    }, []);

    const usernameOrEmail = user => 
        emailPattern.test(user) ? "email" : "username";

    const apiUrl = "https://scm-daw.herokuapp.com/api";
    const fetchAuth = ({ user, password }) => {
        const fullUrl = `${api}/user/auth?user=${user}&password=${password}`;
        return fetch(fullUrl).then(res => res.json());
    }

    const fetchUser = user => {
        const fullUrl = `${api}/user?user=${user}`;
        return fetch(fullUrl).then(res => res.json());
    }

    const onSubmit = credentials => {
        fetchAuth(credentials).then(({ user, password }) => {
            if (!user) invalidate("user", userErrorMsg);
            if (!password) invalidate("password", passwordErrorMsg);

            if (user && password) {
                fetchUser(credentials.user).then(user => {
                    attemptLogin(user);
                    if (user) {
                        attemptLogin(user);
                        redirect("/camps");
                    }
                }).catch(_ => attemptLogin(false));
            }
        });
    }

    return (
        <>
            <LoginBanner render={login.attempted} success={login.success} />

            <form onSubmit={handleSubmit(onSubmit)}>
                <div class="form-title">
                    <h1><span>Sign in</span> to our camp</h1>
                </div>
                <div class="form-field">
                    <label for="user">Username or Email</label>
                    <input type="text" name="user" autoFocus { ...register("user", {
                        errorMsg: userErrorMsg
                    })}/>
                    <p className={`${valid("user") ? "hide" : "show"}`}>
                        { errorMsg("user") }
                    </p>
                </div>
                <div class="form-field">
                    <label for="password">Password</label>
                    <input type="password" name="password" { ...register("password", {
                        errorMsg: passwordErrorMsg
                    })} />
                    <p className={`${valid("password") ? "hide" : "show"}`}>
                        { errorMsg("password") }
                    </p>
                </div>
                <div class="form-button-wrapper">
                    <button disabled ref={button}>Sign In</button>
                </div>
            </form>
        </>
    );
}

const container = document.querySelector("#signin-form-container");
ReactDOM.createRoot(container).render(<SignIn />);
