import useSessionStorage from './hooks/useSessionStorage.js';
import BookingModal from './BookingModal.js';
import { api } from './api.js';
const {
  useState,
  useEffect
} = React;

const Camp = () => {
  const [camp, setCamp] = useState(null);
  const [activities, setActivities] = useState(null);
  const [storedCamp] = useSessionStorage("camp");
  useEffect(() => {
    if (storedCamp) {
      fetch(`${api}/camp/${storedCamp.id}`).then(res => res.json()).then(setCamp);
      fetch(`${api}/activities/${storedCamp.id}`).then(res => res.json()).then(setActivities);
    }
  }, [storedCamp]);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => setModalVisible(true);

  const closeModal = () => setModalVisible(false);

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "main-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "camp-pic-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "camp-pic"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/img/camp-card1.jpg",
    alt: "camp-pic"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "camp-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "camp-title"
  }, /*#__PURE__*/React.createElement("h1", null, camp?.name)), /*#__PURE__*/React.createElement("div", {
    className: "camp-location"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gps-icon"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/img/gps-icon.png",
    alt: ""
  })), /*#__PURE__*/React.createElement("h2", null, camp?.location)), /*#__PURE__*/React.createElement("div", {
    className: "camp-description"
  }, /*#__PURE__*/React.createElement("p", null, camp?.description)), /*#__PURE__*/React.createElement("div", {
    className: "camp-filters"
  }, /*#__PURE__*/React.createElement("div", {
    className: "camp-type"
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-icon"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/img/type-icon.png",
    alt: "type-icon"
  })), /*#__PURE__*/React.createElement("h4", null, "Kind |"), /*#__PURE__*/React.createElement("p", null, camp?.kind)), /*#__PURE__*/React.createElement("div", {
    className: "permited-age"
  }, /*#__PURE__*/React.createElement("div", {
    className: "age-icon"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/img/age-icon.png",
    alt: "age-icon"
  })), /*#__PURE__*/React.createElement("h4", null, "Age |"), /*#__PURE__*/React.createElement("p", null, camp?.minAge, " - ", camp?.maxAge, " years")), /*#__PURE__*/React.createElement("div", {
    className: "camp-languages"
  }, /*#__PURE__*/React.createElement("div", {
    className: "language-icon"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/img/languages-icon.png",
    alt: "languages-icon"
  })), /*#__PURE__*/React.createElement("h4", null, "Languages |"), /*#__PURE__*/React.createElement("p", null, (camp?.languages || []).join(", ")))), /*#__PURE__*/React.createElement("div", {
    className: "booking"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: showModal
  }, "Booking"))), /*#__PURE__*/React.createElement("div", {
    className: "camp-activities"
  }, /*#__PURE__*/React.createElement("div", {
    className: "activity-title"
  }, /*#__PURE__*/React.createElement("h1", null, "ACTIVITIES")), /*#__PURE__*/React.createElement("div", {
    className: "activity-container"
  }, activities?.map(activity => /*#__PURE__*/React.createElement("div", {
    className: "activity-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "activity-pic"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/img/icons8-surf-50.png",
    alt: "activity-pic"
  })), /*#__PURE__*/React.createElement("p", null, activity)))))), /*#__PURE__*/React.createElement(BookingModal, {
    show: modalVisible,
    close: closeModal
  }));
};

const container = document.querySelector("#wrapper");
ReactDOM.createRoot(container).render( /*#__PURE__*/React.createElement(Camp, null));