function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import useDidUpdateEffect from './useDidUpdateEffect.js';
var _React = React,
    useState = _React.useState,
    useRef = _React.useRef,
    useEffect = _React.useEffect;

var changeClass = function changeClass(element, _ref) {
  var valid = _ref.valid,
      required = _ref.required,
      empty = _ref.empty;
  return element.className = valid ? "valid" : required || !empty ? "invalid" : "";
};

var isValid = function isValid(state, _ref2) {
  var required = _ref2.required,
      pattern = _ref2.pattern;
  return pattern.test(state) && (!required || required && state.length > 0);
};

var createInitialValids = function createInitialValids(initialState) {
  return Object.keys(initialState).reduce(function (obj, key) {
    return _objectSpread(_objectSpread({}, obj), {}, _defineProperty({}, key, false));
  }, {});
};

var useFormState = function useFormState(initialState) {
  var _useState = useState(initialState),
      _useState2 = _slicedToArray(_useState, 2),
      fields = _useState2[0],
      setFields = _useState2[1];

  var text = function text(name) {
    return fields[name];
  };

  var updateField = function updateField(name, value) {
    return setFields(_objectSpread(_objectSpread({}, fields), {}, _defineProperty({}, name, value)));
  };

  return {
    fields: fields,
    text: text,
    updateField: updateField
  };
};

var useFormValidity = function useFormValidity(initialState) {
  var _useState3 = useState(initialState),
      _useState4 = _slicedToArray(_useState3, 2),
      fields = _useState4[0],
      setFields = _useState4[1];

  var valid = function valid(name) {
    return fields[name];
  };

  var setValidity = function setValidity(valid) {
    return function (name) {
      return setFields(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, name, valid));
      });
    };
  };

  var validate = setValidity(true);
  var invalidate = setValidity(false);
  return {
    fields: fields,
    valid: valid,
    validate: validate,
    invalidate: invalidate
  };
};

var useFormRefs = function useFormRefs() {
  var refs = useRef({});

  var ref = function ref(name) {
    return refs.current[name];
  };

  var registerRef = function registerRef(name, ref) {
    return refs.current = _objectSpread(_objectSpread({}, refs.current), {}, _defineProperty({}, name, ref));
  };

  return {
    refs: refs,
    ref: ref,
    registerRef: registerRef
  };
};

var useFormErrors = function useFormErrors() {
  var errorMsgs = useRef({});

  var errorMsg = function errorMsg(name) {
    return errorMsgs.current[name];
  };

  var registerError = function registerError(name, error) {
    return errorMsgs.current[name] = error;
  };

  return {
    errorMsgs: errorMsgs,
    errorMsg: errorMsg,
    registerError: registerError
  };
};

var useFormWatchers = function useFormWatchers() {
  var watchers = useRef(new Set());

  var sub = function sub(fn) {
    return watchers.current.add(fn);
  };

  var watch = function watch(fn) {
    sub(fn);
    return {
      unsub: function unsub() {
        return unwatch(fn);
      }
    };
  };

  var unwatch = function unwatch(fn) {
    return watchers.current.delete(fn);
  };

  var invokeWatchers = function invokeWatchers(state) {
    return watchers.current.forEach(function (fn) {
      return fn(state);
    });
  };

  return {
    watch: watch,
    invokeWatchers: invokeWatchers
  };
};

var useForm = function useForm(initialState) {
  var _useFormState = useFormState(initialState),
      inputs = _useFormState.fields,
      text = _useFormState.text,
      updateField = _useFormState.updateField;

  var _useFormValidity = useFormValidity(createInitialValids(initialState)),
      valids = _useFormValidity.fields,
      valid = _useFormValidity.valid,
      validate = _useFormValidity.validate,
      invalidate = _useFormValidity.invalidate;

  var _useFormRefs = useFormRefs(),
      refs = _useFormRefs.refs,
      ref = _useFormRefs.ref,
      registerRef = _useFormRefs.registerRef;

  var _useFormErrors = useFormErrors(),
      errorMsgs = _useFormErrors.errorMsgs,
      errorMsg = _useFormErrors.errorMsg,
      registerError = _useFormErrors.registerError;

  var _useFormWatchers = useFormWatchers(),
      watch = _useFormWatchers.watch,
      invokeWatchers = _useFormWatchers.invokeWatchers;

  var invalidateWithEffect = function invalidateWithEffect(name, errorMsg) {
    registerError(name, errorMsg);
    invalidate(name);
    changeClass(refs.current[name].current, false);
  };

  var validForm = function validForm() {
    return Object.values(valids).every(function (x) {
      return x;
    });
  };

  useEffect(function () {
    invokeWatchers({
      valid: validForm()
    });
  }, [valids]);

  var register = function register(name, _ref3) {
    var _ref3$required = _ref3.required,
        required = _ref3$required === void 0 ? false : _ref3$required,
        _ref3$pattern = _ref3.pattern,
        pattern = _ref3$pattern === void 0 ? /./ : _ref3$pattern,
        _ref3$errorMsg = _ref3.errorMsg,
        errorMsg = _ref3$errorMsg === void 0 ? "" : _ref3$errorMsg;

    var _useState5 = useState(""),
        _useState6 = _slicedToArray(_useState5, 2),
        state = _useState6[0],
        setState = _useState6[1];

    var ref = useRef(null);
    registerRef(name, ref);

    var onChange = function onChange(e) {
      var value = e.target.value;
      setState(value);
      updateField(name, value);
    };

    var validInput = isValid(state, {
      pattern: pattern,
      required: required
    });
    useEffect(function () {
      validInput ? validate(name) : invalidate(name);
      registerError(name, errorMsg);
    }, [state]);
    useDidUpdateEffect(function () {
      changeClass(ref.current, {
        valid: validInput,
        required: required,
        empty: state.length === 0
      });
    }, [state]);
    return {
      ref: ref,
      name: name,
      onChange: onChange
    };
  };

  var handleSubmit = function handleSubmit(onSubmit) {
    return function (e) {
      e.preventDefault();
      onSubmit(inputs);
    };
  };

  return {
    valid: valid,
    errorMsg: errorMsg,
    register: register,
    invalidate: invalidateWithEffect,
    watch: watch,
    handleSubmit: handleSubmit
  };
};

export default useForm;