const LoginBanner = ({
  render,
  success
}) => {
  const classNames = ["login-banner", render ? "show" : "hide", success ? "success" : "failure"];
  return /*#__PURE__*/React.createElement("div", {
    className: classNames.join(" ")
  }, /*#__PURE__*/React.createElement("p", null, success ? "Logged In!" : "Failed to login"));
};

export default LoginBanner;