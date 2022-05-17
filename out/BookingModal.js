function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Infolayout = function Infolayout(_ref) {
  var firstname = _ref.firstname,
      lastname = _ref.lastname,
      age = _ref.age;
  return /*#__PURE__*/React.createElement("div", {
    className: "kid-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kid-avatar"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/img/kid-pic.jpg",
    alt: "avatar"
  })), /*#__PURE__*/React.createElement("div", {
    className: "first-name"
  }, /*#__PURE__*/React.createElement("h3", null, "First Name"), /*#__PURE__*/React.createElement("p", null, firstname)), /*#__PURE__*/React.createElement("div", {
    className: "last-name"
  }, /*#__PURE__*/React.createElement("h3", null, "Last Name"), /*#__PURE__*/React.createElement("p", null, lastname)), /*#__PURE__*/React.createElement("div", {
    className: "age"
  }, /*#__PURE__*/React.createElement("h3", null, "Age"), /*#__PURE__*/React.createElement("p", null, age)), /*#__PURE__*/React.createElement("button", null, "Reserve camp"));
};

var Addinglayout = function Addinglayout() {
  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      visible = _React$useState2[0],
      setVisible = _React$useState2[1];

  return /*#__PURE__*/React.createElement("div", {
    className: "add-kid-section"
  }, /*#__PURE__*/React.createElement("style", null, "\n\n.element-visible { display: flex }\n.element-hidden { display: none }\n\n"), /*#__PURE__*/React.createElement("div", {
    className: visible ? 'element-hidden' : 'element-visible',
    id: "addButton"
  }, /*#__PURE__*/React.createElement("input", {
    onClick: function onClick() {
      return setVisible(!visible);
    },
    id: "plus-icon",
    type: "image",
    src: "../assets/img/plus-icon.png",
    alt: "plus-icon"
  })), /*#__PURE__*/React.createElement("div", {
    className: visible ? 'element-visible' : 'element-hidden',
    id: "kid-avatar"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/img/kid-pic.jpg",
    alt: "avatar"
  })), /*#__PURE__*/React.createElement("div", {
    className: visible ? 'element-visible' : 'element-hidden',
    id: "IDsection"
  }, /*#__PURE__*/React.createElement("label", {
    for: "DNI"
  }, "DNI"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "DNI"
  })), /*#__PURE__*/React.createElement("div", {
    className: visible ? 'element-visible' : 'element-hidden',
    id: "complete-name"
  }, /*#__PURE__*/React.createElement("label", {
    for: ""
  }, "Complete Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "First Name"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Last Name"
  })), /*#__PURE__*/React.createElement("div", {
    className: visible ? 'element-visible' : 'element-hidden',
    id: "age"
  }, /*#__PURE__*/React.createElement("label", {
    for: "age"
  }, "Age"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Age"
  })), /*#__PURE__*/React.createElement("button", {
    className: visible ? 'element-visible' : 'element-hidden'
  }, "Add kid"));
};

var InfoCards = function InfoCards() {
  return /*#__PURE__*/React.createElement("div", {
    className: "kid-cards"
  }, /*#__PURE__*/React.createElement(Infolayout, {
    firstname: "Juan",
    lastname: "Perez",
    age: "9"
  }), /*#__PURE__*/React.createElement(Infolayout, {
    firstname: "Adrian",
    lastname: "Perez",
    age: "14"
  }));
};

var AddCard = function AddCard() {
  return /*#__PURE__*/React.createElement("div", {
    className: "add-kid-card"
  }, /*#__PURE__*/React.createElement(Addinglayout, null));
};

var BookingModal = function BookingModal() {
  var _React$useState3 = React.useState(true),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      visible = _React$useState4[0],
      setVisible = _React$useState4[1];

  return /*#__PURE__*/React.createElement("div", {
    className: visible ? 'element-visible' : 'element-hidden',
    id: "booking-modal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "close-button"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setVisible(!visible);
    }
  }, "X")), /*#__PURE__*/React.createElement(InfoCards, null), /*#__PURE__*/React.createElement(AddCard, null));
};

var container = document.querySelector("#booking-modal-wrapper");
ReactDOM.createRoot(container).render( /*#__PURE__*/React.createElement(BookingModal, null)); // export default BookingModal;