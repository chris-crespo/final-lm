function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DoubleRangeSlider = /*#__PURE__*/function (_React$Component) {
  _inherits(DoubleRangeSlider, _React$Component);

  var _super = _createSuper(DoubleRangeSlider);

  function DoubleRangeSlider() {
    var _this;

    _classCallCheck(this, DoubleRangeSlider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      sliderWidth: 0,
      offsetSliderWidht: 0,
      min: 0,
      max: 16,
      minValueBetween: 1,
      currentMin: 4,
      inputMin: 4,
      currentMax: 12,
      inputMax: 12
    });

    _defineProperty(_assertThisInitialized(_this), "setMin", function (e) {
      var _this$state = _this.state,
          min = _this$state.min,
          max = _this$state.max,
          currentMax = _this$state.currentMax,
          minValueBetween = _this$state.minValueBetween;
      var inputMin = e.target.value;

      _this.setState({
        inputMin: inputMin
      });

      if (inputMin >= min && inputMin <= currentMax - minValueBetween) {
        _this.setState({
          currentMin: parseInt(inputMin)
        });

        _this.minValue.style.width = inputMin * 100 / max + "%";
      }
    });

    _defineProperty(_assertThisInitialized(_this), "changeMinValue", function (e) {
      e.preventDefault();
      document.addEventListener('mousemove', _this.onMouseMoveMin);
      document.addEventListener('mouseup', _this.onMouseUpMin);
      document.addEventListener('touchmove', _this.onMouseMoveMin);
      document.addEventListener('touchend', _this.onMouseUpMin);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseMoveMin", function (e) {
      var _this$state2 = _this.state,
          min = _this$state2.min,
          max = _this$state2.max,
          currentMax = _this$state2.currentMax,
          minValueBetween = _this$state2.minValueBetween,
          sliderWidth = _this$state2.sliderWidth,
          offsetSliderWidht = _this$state2.offsetSliderWidht;
      var dragedWidht = e.clientX - offsetSliderWidht;
      var dragedWidhtInPercent = dragedWidht * 100 / sliderWidth;
      var currentMin = Math.abs(parseInt(max * dragedWidhtInPercent / 100));
      console.log(e.pageX, e.clientX, offsetSliderWidht);
      console.log(currentMin, currentMax - minValueBetween);
      console.log(max * dragedWidhtInPercent / 100);

      if (currentMin >= min && currentMin <= currentMax - minValueBetween) {
        _this.minValue.style.width = dragedWidhtInPercent + "%";
        _this.minValue.dataset.content = currentMin;

        _this.setState({
          currentMin: currentMin,
          inputMin: currentMin
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseUpMin", function () {
      document.removeEventListener('mouseup', _this.onMouseUpMin);
      document.removeEventListener('mousemove', _this.onMouseMoveMin);
      document.removeEventListener('touchend', _this.onMouseMoveMin);
      document.removeEventListener('touchmove', _this.onMouseUpMin);
    });

    _defineProperty(_assertThisInitialized(_this), "setMax", function (e) {
      var _this$state3 = _this.state,
          min = _this$state3.min,
          max = _this$state3.max,
          currentMin = _this$state3.currentMin,
          currentMax = _this$state3.currentMax,
          minValueBetween = _this$state3.minValueBetween;
      var inputMax = e.target.value;

      _this.setState({
        inputMax: inputMax
      });

      if (inputMax >= currentMin + minValueBetween && inputMax <= max) {
        _this.setState({
          currentMax: parseInt(inputMax)
        });

        _this.maxValue.style.width = inputMax * 100 / max + "%";
      }
    });

    _defineProperty(_assertThisInitialized(_this), "changeMaxValue", function (e) {
      e.preventDefault();
      document.addEventListener('mousemove', _this.onMouseMoveMax);
      document.addEventListener('mouseup', _this.onMouseUpMax);
      document.addEventListener('touchmove', _this.onMouseMoveMax);
      document.addEventListener('touchend', _this.onMouseUpMax);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseMoveMax", function (e) {
      var _this$state4 = _this.state,
          max = _this$state4.max,
          currentMin = _this$state4.currentMin,
          minValueBetween = _this$state4.minValueBetween,
          sliderWidth = _this$state4.sliderWidth,
          offsetSliderWidht = _this$state4.offsetSliderWidht;
      var maxWalueThumb = _this.maxValue;
      var dragedWidht = e.clientX - offsetSliderWidht;
      var dragedWidhtInPercent = dragedWidht * 100 / sliderWidth;
      var currentMax = Math.abs(parseInt(max * dragedWidhtInPercent / 100));

      if (currentMax >= currentMin + minValueBetween && currentMax <= max) {
        maxWalueThumb.style.width = dragedWidhtInPercent + "%";
        maxWalueThumb.dataset.content = currentMax;

        _this.setState({
          currentMax: currentMax,
          inputMax: currentMax
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseUpMax", function () {
      document.removeEventListener('mouseup', _this.onMouseUp);
      document.removeEventListener('mousemove', _this.onMouseMoveMax);
      document.removeEventListener('touchend', _this.onMouseUp);
      document.removeEventListener('touchmove', _this.onMouseMoveMax);
    });

    _defineProperty(_assertThisInitialized(_this), "maxForMin", function () {
      var _this$state5 = _this.state,
          currentMax = _this$state5.currentMax,
          minValueBetween = _this$state5.minValueBetween;
      return currentMax - minValueBetween;
    });

    _defineProperty(_assertThisInitialized(_this), "minForMax", function () {
      var _this$state6 = _this.state,
          currentMin = _this$state6.currentMin,
          minValueBetween = _this$state6.minValueBetween;
      return currentMin + minValueBetween;
    });

    return _this;
  }

  _createClass(DoubleRangeSlider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$state7 = this.state,
          currentMin = _this$state7.currentMin,
          currentMax = _this$state7.currentMax,
          max = _this$state7.max;
      this.minValue.style.width = currentMin * 100 / max + "%";
      this.maxValue.style.width = currentMax * 100 / max + "%";
      this.setState({
        sliderWidth: this.slider.offsetWidth,
        offsetSliderWidht: this.slider.offsetLeft
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state8 = this.state,
          min = _this$state8.min,
          max = _this$state8.max,
          currentMin = _this$state8.currentMin,
          inputMin = _this$state8.inputMin,
          currentMax = _this$state8.currentMax,
          inputMax = _this$state8.inputMax,
          minValueBetween = _this$state8.minValueBetween;
      return /*#__PURE__*/React.createElement("div", {
        className: "card"
      }, /*#__PURE__*/React.createElement("h4", null, "Age Range"), /*#__PURE__*/React.createElement("div", {
        className: "values"
      }, /*#__PURE__*/React.createElement("div", null, min), /*#__PURE__*/React.createElement("div", null, max)), /*#__PURE__*/React.createElement("div", {
        ref: function ref(_ref5) {
          return _this2.slider = _ref5;
        },
        id: "slider"
      }, /*#__PURE__*/React.createElement("div", {
        ref: function ref(_ref2) {
          return _this2.minValue = _ref2;
        },
        id: "min",
        "data-content": currentMin
      }, /*#__PURE__*/React.createElement("div", {
        ref: function ref(_ref) {
          return _this2.minValueDrag = _ref;
        },
        id: "min-drag",
        onMouseDown: this.changeMinValue,
        onTouchStart: this.changeMinValue
      })), /*#__PURE__*/React.createElement("div", {
        ref: function ref(_ref4) {
          return _this2.maxValue = _ref4;
        },
        id: "max",
        "data-content": currentMax
      }, /*#__PURE__*/React.createElement("div", {
        ref: function ref(_ref3) {
          return _this2.maxValueDrag = _ref3;
        },
        id: "max-drag",
        onMouseDown: this.changeMaxValue,
        onTouchStart: this.changeMaxValue
      }))));
    }
  }]);

  return DoubleRangeSlider;
}(React.Component);

ReactDOM.render( /*#__PURE__*/React.createElement(DoubleRangeSlider, null), document.getElementById('root'));