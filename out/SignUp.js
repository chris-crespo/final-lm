import useSessionStorage from './hooks/useSessionStorage.js';
import CredentialsForm from './CredentialsForm.js';
import UserDataForm from './UserDataForm.js';
import { api } from './api.js';
import redirect from './redirect.js';
const {
  useState
} = React;

const SignUp = props => {
  const [user, storeUser] = useSessionStorage("user", {
    "username": "",
    "email": "",
    "name": ""
  });
  const [atSecondStage, setAtSecondStage] = useState(false);

  const toggleStage = () => setAtSecondStage(!atSecondStage);

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: ""
  });

  const next = ({
    username,
    email,
    password
  }) => {
    setCredentials({
      username,
      email,
      password
    });
    toggleStage();
  };

  const register = userData => {
    fetch(`${api}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...credentials,
        ...userData
      })
    }).then(res => res.json()).then(({
      success,
      message
    }) => {
      // TODO: Handle error
      fetch(`${api}/user?user=${credentials.email}`).then(res => res.json()).then(({
        username,
        email,
        name
      }) => {
        storeUser({
          username,
          email,
          name
        });
        redirect("/camps");
      });
    });
  };

  return atSecondStage ? /*#__PURE__*/React.createElement(UserDataForm, {
    registerUser: register
  }) : /*#__PURE__*/React.createElement(CredentialsForm, {
    next: next
  });
};

const container = document.querySelector("#signup-form-container");
ReactDOM.createRoot(container).render( /*#__PURE__*/React.createElement(SignUp, null));