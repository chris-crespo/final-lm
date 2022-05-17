function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import CampFilters from './CampFilters.js';
import CampList from './CampList.js';
import { api } from './api.js';
var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect;

var Camps = function Camps() {
  // Filters
  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      kinds = _useState2[0],
      setKinds = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      langs = _useState4[0],
      setLangs = _useState4[1];

  useEffect(function () {
    fetch("".concat(api, "/camps/kinds")).then(function (res) {
      return res.json();
    }).then(function (_ref) {
      var kinds = _ref.kinds;
      return setKinds(kinds.map(function (kind) {
        return {
          name: kind,
          active: false
        };
      }));
    });
    fetch("".concat(api, "/camps/langs")).then(function (res) {
      return res.json();
    }).then(function (_ref2) {
      var langs = _ref2.langs;
      return setLangs(langs.map(function (lang) {
        return {
          name: lang,
          active: false
        };
      }));
    });
  }, []);

  var toggle = function toggle(options, setOptions) {
    return function (name) {
      // Is there a more efficient way to toggle an option?
      // I'm sure there is. by copilot btw 
      var target = options.find(function (k) {
        return k.name === name;
      });
      var rest = options.filter(function (k) {
        return k.name !== name;
      });
      setOptions([].concat(_toConsumableArray(rest), [_objectSpread(_objectSpread({}, target), {}, {
        active: !target.active
      })]).sort(function (o1, o2) {
        return o1.name > o2.name;
      }));
    };
  };

  var toggleKind = toggle(kinds, setKinds);
  var toggleLang = toggle(langs, setLangs);

  var activeOptions = function activeOptions(options) {
    return options.filter(function (o) {
      return o.active;
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CampFilters, {
    kinds: kinds,
    langs: langs,
    toggleKind: toggleKind,
    toggleLang: toggleLang
  }), /*#__PURE__*/React.createElement(CampList, {
    kinds: activeOptions(kinds),
    langs: activeOptions(langs)
  }));
};

var container = document.querySelector(".camps-wrapper");
ReactDOM.createRoot(container).render( /*#__PURE__*/React.createElement(Camps, null));