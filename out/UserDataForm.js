function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import useForm from './hooks/useForm.js';
import { namePattern, phonePattern } from './patterns.js';
var _React = React,
    useState = _React.useState;

var UserDataForm = function UserDataForm(_ref) {
  var registerUser = _ref.registerUser;

  var _useForm = useForm({
    "first-name": "",
    "last-name": "",
    "phone-number": ""
  }),
      valid = _useForm.valid,
      errorMsg = _useForm.errorMsg,
      register = _useForm.register,
      handleSubmit = _useForm.handleSubmit;

  var onSubmit = function onSubmit(userData) {
    return registerUser(userData);
  };

  return /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/React.createElement("div", {
    class: "form-title"
  }, /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("span", null, "Sign up"), " to our camp")), /*#__PURE__*/React.createElement("div", {
    class: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    for: "first-name"
  }, "First Name"), /*#__PURE__*/React.createElement("input", _extends({
    type: "text",
    name: "first-name",
    autoFocus: true
  }, register("first-name", {
    pattern: namePattern,
    errorMsg: "First name may only contain letters, spaces or ."
  }))), /*#__PURE__*/React.createElement("p", {
    className: "".concat(valid("first-name") ? "hide" : "show")
  }, errorMsg("first-name"))), /*#__PURE__*/React.createElement("div", {
    class: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    for: "last-name"
  }, "Last Name"), /*#__PURE__*/React.createElement("input", _extends({
    type: "text",
    name: "last-name"
  }, register("last-name", {
    pattern: namePattern,
    errorMsg: "Last name may only contain letters, spaces or ."
  }))), /*#__PURE__*/React.createElement("p", {
    className: "".concat(valid("last-name") ? "hide" : "show")
  }, errorMsg("last-name"))), /*#__PURE__*/React.createElement("div", {
    class: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    for: "phone-number"
  }, "Phone Number"), /*#__PURE__*/React.createElement("input", _extends({
    type: "tel",
    name: "phone-number"
  }, register("phone-number", {
    pattern: phonePattern,
    errorMsg: "Invalid phone number format"
  }))), /*#__PURE__*/React.createElement("p", {
    className: "".concat(valid("phone-number") ? "hide" : "show")
  }, errorMsg("phone-number"))), /*#__PURE__*/React.createElement("div", {
    class: "form-button-wrapper"
  }, /*#__PURE__*/React.createElement("button", null, "Create Account")));
};

export default UserDataForm;