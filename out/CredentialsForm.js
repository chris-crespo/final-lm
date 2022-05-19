function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import useForm from './hooks/useForm.js';
import { usernamePattern, emailPattern, passwordPattern } from './patterns.js';
import { api } from './api.js';
const {
  useState,
  useRef,
  useEffect
} = React;

const Loader = ({
  i
}) => /*#__PURE__*/React.createElement("div", {
  class: "form-button-loading",
  style: {
    animationDelay: `${i * 200}ms`
  }
});

const Loaders = () => /*#__PURE__*/React.createElement("div", {
  class: "form-loaders"
}, [...Array(3).keys()].map(i => /*#__PURE__*/React.createElement(Loader, {
  i: i
})));

const CredentialsForm = ({
  next
}) => {
  const {
    valid,
    errorMsg,
    invalidate,
    register,
    watch,
    handleSubmit
  } = useForm({
    username: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const button = useRef(null);
  useEffect(() => {
    const listener = ({
      valid
    }) => button.current.disabled = !valid;

    const sub = watch(listener);
    return () => sub.unsub();
  }, []);

  const fetchAvailable = ({
    username,
    email
  }) => {
    return fetch(`${api}/user/available?username=${username}&email=${email}`).then(res => res.json());
  };

  const onSubmit = credentials => {
    setLoading(true);
    fetchAvailable(credentials).then(({
      username,
      email
    }) => {
      if (!username) invalidate("username", "Username already exists");
      if (!email) invalidate("email", "Email address in use");
      setLoading(false);
      if (username && email) next(credentials);
    });
  };

  return /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/React.createElement("div", {
    class: "form-title"
  }, /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("span", null, "Sign up"), " to our camp")), /*#__PURE__*/React.createElement("div", {
    class: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    for: "username"
  }, "Username"), /*#__PURE__*/React.createElement("input", _extends({
    type: "text",
    name: "username",
    autoFocus: true
  }, register("username", {
    required: true,
    pattern: usernamePattern,
    errorMsg: "Username must containt at least 6 characters"
  }))), /*#__PURE__*/React.createElement("p", {
    className: `${valid("username") ? "hide" : "show"}`
  }, errorMsg("username"))), /*#__PURE__*/React.createElement("div", {
    class: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    for: "email"
  }, "Email"), /*#__PURE__*/React.createElement("input", _extends({
    type: "email",
    name: "email"
  }, register("email", {
    required: true,
    pattern: emailPattern,
    errorMsg: "Invalid email address"
  }))), /*#__PURE__*/React.createElement("p", {
    className: `${valid("email") ? "hide" : "show"}`
  }, errorMsg("email"))), /*#__PURE__*/React.createElement("div", {
    class: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    for: "password"
  }, "Password"), /*#__PURE__*/React.createElement("input", _extends({
    type: "password",
    name: "password"
  }, register("password", {
    required: true,
    pattern: passwordPattern,
    errorMsg: "Password must contain at least 6 characters"
  }))), /*#__PURE__*/React.createElement("p", {
    className: `${valid("password") ? "hide" : "show"}`
  }, errorMsg("password"))), /*#__PURE__*/React.createElement("div", {
    class: "form-button-wrapper"
  }, /*#__PURE__*/React.createElement("button", {
    disabled: true,
    ref: button,
    className: `${loading ? "loading" : ""}`
  }, loading ? /*#__PURE__*/React.createElement(Loaders, null) : "Next")));
};

export default CredentialsForm;