var LoginBanner = function LoginBanner(_ref) {
  var render = _ref.render,
      success = _ref.success;
  var classNames = ["login-banner", render ? "show" : "hide", success ? "success" : "failure"];
  return /*#__PURE__*/React.createElement("div", {
    className: classNames.join(" ")
  }, /*#__PURE__*/React.createElement("p", null, success ? "Logged In!" : "Failed to login"));
};

export default LoginBanner;