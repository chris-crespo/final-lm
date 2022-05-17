var Filter = function Filter(_ref) {
  var title = _ref.title,
      children = _ref.children;
  return /*#__PURE__*/React.createElement("section", {
    className: "filter"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "filter-title"
  }, title), children);
};

var OptionsFilter = function OptionsFilter(_ref2) {
  var title = _ref2.title,
      options = _ref2.options,
      toggle = _ref2.toggle;
  return /*#__PURE__*/React.createElement(Filter, {
    title: title
  }, /*#__PURE__*/React.createElement("div", {
    className: "camp-filter-options"
  }, options.map(function (option) {
    return /*#__PURE__*/React.createElement("span", {
      className: "camp-filter-option ".concat(option.active ? "active" : ""),
      onClick: toggle.bind(null, option.name)
    }, option.name);
  })));
};

var CampFilters = function CampFilters(_ref3) {
  var kinds = _ref3.kinds,
      langs = _ref3.langs,
      toggleKind = _ref3.toggleKind,
      toggleLang = _ref3.toggleLang;
  return /*#__PURE__*/React.createElement("div", {
    className: "filters"
  }, /*#__PURE__*/React.createElement(OptionsFilter, {
    title: "Kinds",
    options: kinds,
    toggle: toggleKind
  }), /*#__PURE__*/React.createElement(OptionsFilter, {
    title: "Languages",
    options: langs,
    toggle: toggleLang
  }), /*#__PURE__*/React.createElement("div", {
    id: "root"
  }));
};

export default CampFilters;