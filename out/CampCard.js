function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import useSessionStorage from "./hooks/useSessionStorage.js";
import to from './redirect.js';

var Icon = function Icon(_ref) {
  var name = _ref.name;
  return /*#__PURE__*/React.createElement("div", {
    className: "location-icon"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/img/".concat(name, "-icon.png"),
    alt: ""
  }));
};

var CampCard = function CampCard(_ref2) {
  var camp = _ref2.camp;

  var _useSessionStorage = useSessionStorage("camp", {
    id: 0
  }),
      _useSessionStorage2 = _slicedToArray(_useSessionStorage, 2),
      _ = _useSessionStorage2[0],
      storeCamp = _useSessionStorage2[1];

  var redirectToCamp = function redirectToCamp() {
    storeCamp({
      id: camp.id
    });
    to("/camp");
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "camp-card",
    onClick: redirectToCamp
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-img"
  }, /*#__PURE__*/React.createElement("img", {
    src: camp.img,
    alt: "Camp image"
  })), /*#__PURE__*/React.createElement("div", {
    className: "card-info"
  }, /*#__PURE__*/React.createElement("h2", null, camp.name), /*#__PURE__*/React.createElement("div", {
    className: "card-info-items"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "gps"
  }), camp.location), "|", /*#__PURE__*/React.createElement("span", null, camp["min-age"], " - ", camp["max-age"], " years"), "|", /*#__PURE__*/React.createElement("span", null, camp.kind))));
};

export default CampCard;