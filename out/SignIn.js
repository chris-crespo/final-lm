function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import LoginBanner from './LoginBanner.js';
import useForm from './hooks/useForm.js';
import useSessionStorage from './hooks/useSessionStorage.js';
import { emailPattern, passwordPattern } from './patterns.js';
import redirect from './redirect.js';
import { api } from './api.js';
const {
  useState,
  useRef,
  useEffect
} = React;
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
  } = useForm({
    "user": "",
    "password": ""
  });
  const [user, storeUser] = useSessionStorage("user", {
    "username": "",
    "email": "",
    "name": ""
  });
  const [login, setLogin] = useState({
    attempted: false,
    success: false
  });

  const attemptLogin = success => {
    setLogin({
      attempted: true,
      success
    });
    setTimeout(() => setLogin({
      attempted: false,
      success
    }), 3000);
  };

  const button = useRef(null);
  useEffect(() => {
    const listener = ({
      valid
    }) => button.current.disabled = !valid;

    const sub = watch(listener);
    return () => sub.unsub();
  }, []);

  const fetchAuth = ({
    user,
    password
  }) => {
    const fullUrl = `${api}/user/auth?user=${user}&password=${password}`;
    return fetch(fullUrl).then(res => res.json());
  };

  const fetchUser = user => {
    const fullUrl = `${api}/user?user=${user}`;
    return fetch(fullUrl).then(res => res.json());
  };

  const onSubmit = credentials => {
    fetchAuth(credentials).then(({
      user,
      password
    }) => {
      if (!user) invalidate("user", userErrorMsg);
      if (!password) invalidate("password", passwordErrorMsg);

      if (user && password) {
        fetchUser(credentials.user).then(user => {
          attemptLogin(user);

          if (user) {
            storeUser(user);
            attemptLogin(user);
            redirect("/camps");
          }
        }).catch(_ => attemptLogin(false));
      }
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LoginBanner, {
    render: login.attempted,
    success: login.success
  }), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/React.createElement("div", {
    class: "form-title"
  }, /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("span", null, "Sign in"), " to our camp")), /*#__PURE__*/React.createElement("div", {
    class: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    for: "user"
  }, "Username or Email"), /*#__PURE__*/React.createElement("input", _extends({
    type: "text",
    name: "user",
    autoFocus: true
  }, register("user", {
    errorMsg: userErrorMsg
  }))), /*#__PURE__*/React.createElement("p", {
    className: `${valid("user") ? "hide" : "show"}`
  }, errorMsg("user"))), /*#__PURE__*/React.createElement("div", {
    class: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    for: "password"
  }, "Password"), /*#__PURE__*/React.createElement("input", _extends({
    type: "password",
    name: "password"
  }, register("password", {
    errorMsg: passwordErrorMsg
  }))), /*#__PURE__*/React.createElement("p", {
    className: `${valid("password") ? "hide" : "show"}`
  }, errorMsg("password"))), /*#__PURE__*/React.createElement("div", {
    class: "form-button-wrapper"
  }, /*#__PURE__*/React.createElement("button", {
    disabled: true,
    ref: button
  }, "Sign In"))));
};

const container = document.querySelector("#signin-form-container");
ReactDOM.createRoot(container).render( /*#__PURE__*/React.createElement(SignIn, null));