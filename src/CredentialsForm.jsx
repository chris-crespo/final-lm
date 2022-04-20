const { useState } = React;

const validUsername = username => /[A-Za-z0-9_\-]{6}/.test(username);
const validPassword = password => /[a-z0-9]{6}/i.test(password);
const validEmail = email => /[a-z0-9_\.\-]+@[a-z]+\.[a-z]+/i.test(email);

const getClass = (field, validate) => {
    if (!validate(field)) return "invalid"
    else if (field.length === 0) return ""
    else return "valid";
}

const CredentialsForm = ({ next }) => {
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

    const fetchAvailable = () => {
        const url = "https://scm-daw.herokuapp.com/api/available?";
        return fetch(`${url}username=${username}&email=${email}`, { mode: "cors" })
            .then(res => { console.log(res); return res.json() })
    }

    const handleSubmit = e => {
        e.preventDefault();

        const credentails = { username, email, password };
        fetchAvailable()
            .then(({ username, email }) => username && email && next(credentials)); 
    }

    return (
        <form onSubmit={handleSubmit}>
            <div class="form-title">
                <h1><span>Sign up</span> to our camp</h1>
            </div>
            <div class="form-field">
                <label for="username">Username</label>
                <input type="text" name="username" required
                       value={username} onChange={updateUsername} />
            </div>
            <div class="form-field">
                <label for="email">Email</label>
                <input type="email" name="email" required
                       value={email} onChange={updateEmail} />
            </div>
            <div class="form-field">
                <label for="password">Password</label>
                <input type="password" name="password" required
                       value={password} onChange={updatePassword} />
            </div>
            <div class="form-button-wrapper">
                <button>Next</button>
            </div>
        </form>
    )
}

export default CredentialsForm
