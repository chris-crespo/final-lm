import CredentialsForm from './CredentialsForm.js'
import UserDataForm from './UserDataForm.js'

const { useState } = React;

const SignUp = props => {
    const [atSecondStage, setAtSecondStage] = useState(false);
    const toggleStage = () => setAtSecondStage(!atSecondStage);

    return atSecondStage 
        ? <UserDataForm /> 
        : <CredentialsForm handleSubmit={toggleStage} />
} 

const container = document.querySelector("#signup-form-container")
ReactDOM.createRoot(container).render(<SignUp />)
