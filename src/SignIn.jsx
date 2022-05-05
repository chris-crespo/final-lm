const SignIn = () => {
    return (
        <form>
            <div class="form-title">
                <h1><span>Sign in</span> to our camp</h1>
            </div>
            <div class="form-field">
                <label for="email">Username or Email</label>
                <input type="email" name="email" />
            </div>
            <div class="form-field">
                <label for="password">Password</label>
                <input type="password" name="password" />
            </div>
            <div class="form-button-wrapper">
                <button>Sign In</button>
            </div>
        </form>
    );
}

const container = document.querySelector("#signin-form-container");
ReactDOM.createRoot(container).render(<SignIn />);
