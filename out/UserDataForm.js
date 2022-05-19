function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import useForm from './hooks/useForm.js';
import { namePattern, phonePattern } from './patterns.js';
const {
  useState
} = React;

const UserDataForm = ({
  registerUser
}) => {
  const {
    valid,
    errorMsg,
    register,
    handleSubmit
  } = useForm({
    "first-name": "",
    "last-name": "",
    "phone": ""
  });

  const onSubmit = userData => registerUser(userData);

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
    className: `${valid("first-name") ? "hide" : "show"}`
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
    className: `${valid("last-name") ? "hide" : "show"}`
  }, errorMsg("last-name"))), /*#__PURE__*/React.createElement("div", {
    class: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    for: "phone-number"
  }, "Phone Number"), /*#__PURE__*/React.createElement("input", _extends({
    type: "tel",
    name: "phone"
  }, register("phone", {
    pattern: phonePattern,
    errorMsg: "Invalid phone number format"
  }))), /*#__PURE__*/React.createElement("p", {
    className: `${valid("phone") ? "hide" : "show"}`
  }, errorMsg("phone"))), /*#__PURE__*/React.createElement("div", {
    class: "form-button-wrapper"
  }, /*#__PURE__*/React.createElement("button", null, "Create Account")));
};

export default UserDataForm;