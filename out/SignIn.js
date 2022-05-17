function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import LoginBanner from './LoginBanner.js';
import useForm from './hooks/useForm.js';
import useSessionStorage from './hooks/useSessionStorage.js';
import { emailPattern, passwordPattern } from './patterns.js';
import redirect from './redirect.js';
import { api } from './api.js';
var _React = React,
    useState = _React.useState,
    useRef = _React.useRef,
    useEffect = _React.useEffect;
var userErrorMsg = "Username or email does not exist";
var passwordErrorMsg = "Passwords do not match";

var SignIn = function SignIn() {
  var _useForm = useForm({
    "user": "",
    "password": ""
  }),
      register = _useForm.register,
      valid = _useForm.valid,
      invalidate = _useForm.invalidate,
      errorMsg = _useForm.errorMsg,
      watch = _useForm.watch,
      handleSubmit = _useForm.handleSubmit;

  var _useSessionStorage = useSessionStorage("user", {
    "username": "",
    "email": "",
    "name": ""
  }),
      _useSessionStorage2 = _slicedToArray(_useSessionStorage, 2),
      user = _useSessionStorage2[0],
      storeUser = _useSessionStorage2[1];

  var _useState = useState({
    attempted: false,
    success: false
  }),
      _useState2 = _slicedToArray(_useState, 2),
      login = _useState2[0],
      setLogin = _useState2[1];

  var attemptLogin = function attemptLogin(success) {
    setLogin({
      attempted: true,
      success: success
    });
    setTimeout(function () {
      return setLogin({
        attempted: false,
        success: success
      });
    }, 3000);
  };

  var button = useRef(null);
  useEffect(function () {
    var listener = function listener(_ref) {
      var valid = _ref.valid;
      return button.current.disabled = !valid;
    };

    var sub = watch(listener);
    return function () {
      return sub.unsub();
    };
  }, []);

  var fetchAuth = function fetchAuth(_ref2) {
    var user = _ref2.user,
        password = _ref2.password;
    var fullUrl = "".concat(api, "/user/auth?user=").concat(user, "&password=").concat(password);
    return fetch(fullUrl).then(function (res) {
      return res.json();
    });
  };

  var fetchUser = function fetchUser(user) {
    var fullUrl = "".concat(api, "/user?user=").concat(user);
    return fetch(fullUrl).then(function (res) {
      return res.json();
    });
  };

  var onSubmit = function onSubmit(credentials) {
    fetchAuth(credentials).then(function (_ref3) {
      var user = _ref3.user,
          password = _ref3.password;
      if (!user) invalidate("user", userErrorMsg);
      if (!password) invalidate("password", passwordErrorMsg);

      if (user && password) {
        fetchUser(credentials.user).then(function (user) {
          attemptLogin(user);

          if (user) {
            storeUser(user);
            attemptLogin(user);
            redirect("/camps");
          }
        }).catch(function (_) {
          return attemptLogin(false);
        });
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
    className: "".concat(valid("user") ? "hide" : "show")
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
    className: "".concat(valid("password") ? "hide" : "show")
  }, errorMsg("password"))), /*#__PURE__*/React.createElement("div", {
    class: "form-button-wrapper"
  }, /*#__PURE__*/React.createElement("button", {
    disabled: true,
    ref: button
  }, "Sign In"))));
};

var container = document.querySelector("#signin-form-container");
ReactDOM.createRoot(container).render( /*#__PURE__*/React.createElement(SignIn, null));