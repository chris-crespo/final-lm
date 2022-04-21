import CredentialsForm from './CredentialsForm.js'
import UserDataForm from './UserDataForm.js'

const { useState } = React;

const SignUp = props => {
    const [atSecondStage, setAtSecondStage] = useState(false);
    const toggleStage = () => setAtSecondStage(!atSecondStage);

    const [credentials, setCredentials] = useState({ username: "", email: "", password: "" });

    const next = ({ username, email, password }) => {
        setCredentials({ username, email, password });
        toggleStage();
    }

    const register = userData => {
        fetch("https://scm-daw.herokuapp.com/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...credentials, ...userData })
        }).then(res => res.json()).then(console.log);
    }

    return atSecondStage 
        ? <UserDataForm registerUser={register} /> 
        : <CredentialsForm next={next} />
} 

const container = document.querySelector("#signup-form-container")
ReactDOM.createRoot(container).render(<SignUp />)
