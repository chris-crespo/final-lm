import useSessionStorage from "./hooks/useSessionStorage.js";
import to from './redirect.js';

const Icon = ({
  name
}) => /*#__PURE__*/React.createElement("div", {
  className: "location-icon"
}, /*#__PURE__*/React.createElement("img", {
  src: `../assets/img/${name}-icon.png`,
  alt: ""
}));

const CampCard = ({
  camp
}) => {
  const [_, storeCamp] = useSessionStorage("camp", {
    id: 1
  });

  const redirectToCamp = () => {
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