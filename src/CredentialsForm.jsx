const { useState } = React;

const validUsername = username => /[A-Za-z0-9_\-]{6}/.test(username);
const validPassword = password => /[a-z0-9]{6}/i.test(password);
const validEmail = email => /[a-z0-9_\.\-]+@[a-z]+\.[a-z]+/i.test(email);

const getClass = (field, validate) => {
    if (!validate(field)) return "invalid"
    else if (field.length === 0) return ""
    else return "valid";
}

const CredentialsForm = ({ handleSubmit }) => {
    const updateField = (field, set, validate) => e => {
        set(e.target.value);
        e.target.className = getClass(field, validate);
    }

    const [username, setUsername] = useState("");
    const updateUsername = updateField(username, setUsername, validUsername);

    const [email, setEmail] = useState("");
    const updateEmail = updateField(email, setEmail, validEmail);

    const [password, setPassword] = useState("");
    const updatePassword = updateField(password, setPassword, validPassword);

    return (
        <form onSubmit={handleSubmit}>
            <div class="corner">
                <h4>Already a member? <a href="signin">Sign In</a></h4>
            </div>
            <div class="signupInfo">
                <div class="signuptitle">
                    <h1> Sign up to Our Camp</h1>
                </div>
                <div class="field">
                    <label for="username">Username</label>
                    <input type="text" name="username" required
                           value={username} onChange={updateUsername} />
                </div>
                <div class="field">
                    <label for="email">Email</label>
                    <input type="email" name="email" required
                           value={email} onChange={updateEmail} />
                </div>
                <div class="field">
                    <label for="password">Password</label>
                    <input type="password" name="password" required
                           value={password} onChange={updatePassword} />
                </div>
                <div class="button">
                    <button>Create Account</button>
                </div>
            </div>
        </form>
    )
}

export default CredentialsForm
