function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import CampCard from './CampCard.js';
import { api } from './api.js';
import { curry, and } from './utils.js';
var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect;

var randBetween = function randBetween(low, high) {
  return Math.floor(Math.random() * high + low);
};

var CampList = function CampList(_ref) {
  var kinds = _ref.kinds,
      langs = _ref.langs;

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      camps = _useState2[0],
      setCamps = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      filteredCamps = _useState4[0],
      setFilteredCamps = _useState4[1];

  useEffect(function () {
    fetch("".concat(api, "/camps")).then(function (res) {
      return res.text();
    }).then(function (text) {
      return new window.DOMParser().parseFromString(text, "text/xml");
    }).then(function (xml) {
      return Array.from(xml.firstChild.children).map(parseCamp);
    }).then(function (camps) {
      setCamps(camps);
      setFilteredCamps(camps);
    });
  }, []);

  var parseLangs = function parseLangs(langs) {
    return Array.from(langs).map(function (lang) {
      return lang.textContent;
    });
  };

  var parseCamp = function parseCamp(camp) {
    return Array.from(camp.children).reduce(function (acc, child) {
      return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, child.localName, child.localName === "langs" ? parseLangs(child.children) : child.textContent));
    }, {
      img: "../assets/img/camp-card".concat(randBetween(1, 8), ".jpg")
    });
  };

  var _useState5 = useState(""),
      _useState6 = _slicedToArray(_useState5, 2),
      search = _useState6[0],
      setSearch = _useState6[1];

  var handleSearchBar = function handleSearchBar(e) {
    return setSearch(e.target.value);
  };

  var byName = curry(function (name, camp) {
    return camp.name.toLowerCase().includes(name);
  });
  var emptyOr = curry(function (thunk, opts, camp) {
    return opts.length === 0 || thunk(camp);
  });
  var sameNameAs = curry(function (n1, _ref2) {
    var name = _ref2.name;
    return n1 === name;
  });
  var byKind = emptyOr(function (camp) {
    return kinds.find(sameNameAs(camp.kind));
  });
  var byLang = emptyOr(function (camp) {
    return camp.langs.some(function (lang) {
      return langs.find(sameNameAs(lang));
    });
  });
  useEffect(function () {
    // We could query from the database again, but we opt for this implementation because of 
    // its simplicity and because we have little time left.
    setFilteredCamps(camps.filter(and(byName(search), byKind(kinds), byLang(langs))));
  }, [kinds, langs, search]);
  return /*#__PURE__*/React.createElement("div", {
    class: "camp-list"
  }, /*#__PURE__*/React.createElement("div", {
    class: "search"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search a Camp or a Direction",
    onChange: handleSearchBar,
    value: search
  })), /*#__PURE__*/React.createElement("div", {
    class: "camps-cards"
  }, filteredCamps.map(function (camp) {
    return /*#__PURE__*/React.createElement(CampCard, {
      camp: camp
    });
  })));
};

export default CampList;