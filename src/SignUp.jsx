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
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...credentials, ...userData })
        }).then(res => console.log(res.json()));
    }

    return atSecondStage 
        ? <UserDataForm register={register} /> 
        : <CredentialsForm next={next} />
} 

const container = document.querySelector("#signup-form-container")
ReactDOM.createRoot(container).render(<SignUp />)
