function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import useApi from './hooks/useApi.js';
import useSessionStorage from './hooks/useSessionStorage.js';
import { api } from './api.js';
var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect;

var NavLink = function NavLink(_ref) {
  var name = _ref.name,
      to = _ref.to;
  return /*#__PURE__*/React.createElement("li", {
    className: "navbar-menu-item"
  }, /*#__PURE__*/React.createElement("a", {
    href: to
  }, name), /*#__PURE__*/React.createElement("div", {
    className: "menu-item-line"
  }));
};

var Sign = function Sign() {
  return /*#__PURE__*/React.createElement("ul", {
    className: "navbar-sign"
  }, /*#__PURE__*/React.createElement("li", {
    className: "navbar-sign-item"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/signin"
  }, "Sign in")), /*#__PURE__*/React.createElement("li", {
    className: "navbar-sign-item"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/signup"
  }, "Sign up")));
};

var User = function User(_ref2) {
  var toggle = _ref2.toggle,
      user = _ref2.user,
      loadBookings = _ref2.loadBookings;

  var _useApi = useApi("".concat(api, "/bookings/").concat(user.id)),
      _useApi2 = _slicedToArray(_useApi, 2),
      _ = _useApi2[0],
      result = _useApi2[1];

  useEffect(function () {
    loadBookings(result === null || result === void 0 ? void 0 : result.json().bookings);
  }, [result]);
  return /*#__PURE__*/React.createElement("div", {
    className: "navbar-user",
    onClick: toggle
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 448c-52.93 0-100.9-21.53-135.7-56.29C136.5 349.9 176.5 320 224 320h64c47.54 0 87.54 29.88 103.7 71.71C356.9 426.5 308.9 448 256 448z"
  })));
};

var Sidebar = function Sidebar(_ref3) {
  var toggled = _ref3.toggled,
      user = _ref3.user,
      bookings = _ref3.bookings;
  return /*#__PURE__*/React.createElement("div", {
    className: "sidebar-container ".concat(toggled ? "show" : "hide")
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-header"
  }, /*#__PURE__*/React.createElement("h1", null, "My Profile")), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-user"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-img"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/img/kid-pic.jpg",
    alt: ""
  })), /*#__PURE__*/React.createElement("h1", null, user === null || user === void 0 ? void 0 : user.name)), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-bookings"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-bookings-header"
  }, /*#__PURE__*/React.createElement("h1", null, "Last Bookings")), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-bookings-list"
  }, (bookings === null || bookings === void 0 ? void 0 : bookings.map(function (b) {
    return /*#__PURE__*/React.createElement("div", {
      className: "sidebar-booking"
    }, b.camp);
  })) || /*#__PURE__*/React.createElement("div", {
    className: "sidebar-bookings-empty"
  }, "There are no bookings to show.")))));
};

var Hamburger = function Hamburger(_ref4) {
  var toggle = _ref4.toggle;
  return /*#__PURE__*/React.createElement("div", {
    className: "nav-hamburger",
    onClick: toggle
  }, /*#__PURE__*/React.createElement("div", {
    className: "hamburger-row"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hamburger-row"
  }));
};

var Close = function Close(_ref5) {
  var toggle = _ref5.toggle;
  return /*#__PURE__*/React.createElement("div", {
    className: "nav-close",
    onClick: toggle
  }, /*#__PURE__*/React.createElement("div", {
    className: "close-row"
  }), /*#__PURE__*/React.createElement("div", {
    className: "close-row"
  }));
};

var Menu = function Menu(_ref6) {
  var toggled = _ref6.toggled,
      toggle = _ref6.toggle;
  return /*#__PURE__*/React.createElement("div", {
    className: "menu-container ".concat(toggled ? "show" : "hide")
  }, /*#__PURE__*/React.createElement(Close, {
    toggle: toggle
  }), /*#__PURE__*/React.createElement("ul", {
    className: "menu"
  }, /*#__PURE__*/React.createElement(NavLink, {
    name: "Home",
    to: "/"
  }), /*#__PURE__*/React.createElement(NavLink, {
    name: "Camps",
    to: "/camps"
  }), /*#__PURE__*/React.createElement(NavLink, {
    name: "About",
    to: "/about"
  })));
};

var Nav = function Nav() {
  var _useSessionStorage = useSessionStorage("user"),
      _useSessionStorage2 = _slicedToArray(_useSessionStorage, 1),
      user = _useSessionStorage2[0];

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      sidebar = _useState2[0],
      setSidebar = _useState2[1];

  var toggleSidebar = function toggleSidebar() {
    return setSidebar(!sidebar);
  };

  var _useState3 = useState(true),
      _useState4 = _slicedToArray(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];

  var _useState5 = useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      bookings = _useState6[0],
      setBookings = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      menu = _useState8[0],
      toggleMenu = _useState8[1];

  var open = function open() {
    return toggleMenu(true);
  };

  var close = function close() {
    return toggleMenu(false);
  };

  var loadBookings = function loadBookings(bookings) {
    setLoading(false);
    setBookings(bookings);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("nav", {
    className: "navbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "navbar-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "navbar-logo"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/img/logoC.png",
    alt: "Nav logo"
  })), /*#__PURE__*/React.createElement("ul", {
    className: "navbar-menu"
  }, /*#__PURE__*/React.createElement(NavLink, {
    name: "Home",
    to: "/"
  }), /*#__PURE__*/React.createElement(NavLink, {
    name: "Camps",
    to: "/camps"
  }), /*#__PURE__*/React.createElement(NavLink, {
    name: "About",
    to: "/about"
  }))), /*#__PURE__*/React.createElement(Hamburger, {
    toggle: open
  }), /*#__PURE__*/React.createElement("div", {
    className: "navbar-right"
  }, user ? /*#__PURE__*/React.createElement(User, {
    user: user,
    toggle: toggleSidebar,
    loadBookings: loadBookings
  }) : /*#__PURE__*/React.createElement(Sign, null))), /*#__PURE__*/React.createElement(Sidebar, {
    toggled: sidebar,
    user: user,
    bookings: bookings
  }), /*#__PURE__*/React.createElement(Menu, {
    toggled: menu,
    toggle: close
  }));
};

var container = document.querySelector("#nav-container");
ReactDOM.createRoot(container).render( /*#__PURE__*/React.createElement(Nav, null));