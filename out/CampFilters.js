const Filter = ({
  title,
  children
}) => /*#__PURE__*/React.createElement("section", {
  className: "filter"
}, /*#__PURE__*/React.createElement("h4", {
  className: "filter-title"
}, title), children);

const OptionsFilter = ({
  title,
  options,
  toggle
}) => /*#__PURE__*/React.createElement(Filter, {
  title: title
}, /*#__PURE__*/React.createElement("div", {
  className: "camp-filter-options"
}, options.map(option => /*#__PURE__*/React.createElement("span", {
  className: `camp-filter-option ${option.active ? "active" : ""}`,
  onClick: toggle.bind(null, option.name)
}, option.name))));

const CampFilters = ({
  kinds,
  langs,
  toggleKind,
  toggleLang
}) => {
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