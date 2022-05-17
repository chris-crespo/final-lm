function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import useForm from './hooks/useForm.js';
import { usernamePattern, emailPattern, passwordPattern } from './patterns.js';
import { api } from './api.js';
var _React = React,
    useState = _React.useState,
    useRef = _React.useRef,
    useEffect = _React.useEffect;

var Loader = function Loader(_ref) {
  var i = _ref.i;
  return /*#__PURE__*/React.createElement("div", {
    class: "form-button-loading",
    style: {
      animationDelay: "".concat(i * 200, "ms")
    }
  });
};

var Loaders = function Loaders() {
  return /*#__PURE__*/React.createElement("div", {
    class: "form-loaders"
  }, _toConsumableArray(Array(3).keys()).map(function (i) {
    return /*#__PURE__*/React.createElement(Loader, {
      i: i
    });
  }));
};

var CredentialsForm = function CredentialsForm(_ref2) {
  var next = _ref2.next;

  var _useForm = useForm({
    username: "",
    email: "",
    password: ""
  }),
      valid = _useForm.valid,
      errorMsg = _useForm.errorMsg,
      invalidate = _useForm.invalidate,
      register = _useForm.register,
      watch = _useForm.watch,
      handleSubmit = _useForm.handleSubmit;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var button = useRef(null);
  useEffect(function () {
    var listener = function listener(_ref3) {
      var valid = _ref3.valid;
      return button.current.disabled = !valid;
    };

    var sub = watch(listener);
    return function () {
      return sub.unsub();
    };
  }, []);

  var fetchAvailable = function fetchAvailable(_ref4) {
    var username = _ref4.username,
        email = _ref4.email;
    return fetch("".concat(api, "/user/available?username=").concat(username, "&email=").concat(email)).then(function (res) {
      return res.json();
    });
  };

  var onSubmit = function onSubmit(credentials) {
    setLoading(true);
    fetchAvailable(credentials).then(function (_ref5) {
      var username = _ref5.username,
          email = _ref5.email;
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
    className: "".concat(valid("username") ? "hide" : "show")
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
    className: "".concat(valid("email") ? "hide" : "show")
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
    className: "".concat(valid("password") ? "hide" : "show")
  }, errorMsg("password"))), /*#__PURE__*/React.createElement("div", {
    class: "form-button-wrapper"
  }, /*#__PURE__*/React.createElement("button", {
    disabled: true,
    ref: button,
    className: "".concat(loading ? "loading" : "")
  }, loading ? /*#__PURE__*/React.createElement(Loaders, null) : "Next")));
};

export default CredentialsForm;