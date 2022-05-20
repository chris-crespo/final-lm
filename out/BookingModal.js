function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import useForm from './hooks/useForm.js';
import useSessionStorage from './hooks/useSessionStorage.js';
import { api } from './api.js';
const {
  useState,
  useEffect,
  useRef
} = React;

const Infolayout = ({
  kid
}) => /*#__PURE__*/React.createElement("div", {
  className: "kid-info"
}, /*#__PURE__*/React.createElement("div", {
  className: "kid-avatar"
}, /*#__PURE__*/React.createElement("img", {
  src: "../assets/img/kid-pic.jpg",
  alt: "avatar"
})), /*#__PURE__*/React.createElement("div", {
  className: "first-name"
}, /*#__PURE__*/React.createElement("p", null, kid.firstName)), /*#__PURE__*/React.createElement("div", {
  className: "last-name"
}, /*#__PURE__*/React.createElement("p", null, kid.lastName)));

const Addinglayout = () => {
  const [visible, setVisible] = useState(false);
  const {
    register,
    handleSubmit,
    watch
  } = useForm({
    dni: "",
    firstName: "",
    lastName: "",
    age: ""
  });
  const button = useRef(null);
  useEffect(() => {
    const listener = ({
      valid
    }) => button.current.disabled = !valid;

    const sub = watch(listener);
    return () => sub.unsub();
  }, []);
  const [user] = useSessionStorage("user");

  const onSubmit = kid => {
    fetch(`${api}/kid/${user.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(kid)
    }).then(_ => setVisible(false));
  };

  return /*#__PURE__*/React.createElement("form", {
    className: "add-kid-section",
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/React.createElement("div", {
    className: visible ? 'element-hidden' : 'element-visible',
    id: "addButton"
  }, /*#__PURE__*/React.createElement("input", {
    onClick: () => setVisible(!visible),
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
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "text",
    placeholder: "DNI",
    autoFocus: true
  }, register("dni", {
    required: true,
    pattern: /\d{8}[A-Z]/
  })))), /*#__PURE__*/React.createElement("div", {
    className: visible ? 'element-visible' : 'element-hidden',
    id: "complete-name"
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "text",
    placeholder: "First Name"
  }, register("firstName", {
    required: true
  }))), /*#__PURE__*/React.createElement("input", _extends({
    type: "text",
    placeholder: "Last Name"
  }, register("lastName", {
    required: true
  })))), /*#__PURE__*/React.createElement("div", {
    className: visible ? 'element-visible' : 'element-hidden',
    id: "age"
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "text",
    placeholder: "Age"
  }, register("age", {
    required: true,
    pattern: /[4-9]|1[0-6]/
  })))), /*#__PURE__*/React.createElement("button", {
    className: visible ? 'element-visible' : 'element-hidden',
    ref: button
  }, "Add kid"));
};

const InfoCards = () => {
  const [user] = useSessionStorage("user");
  const [kids, setKids] = useState(null);
  useEffect(() => {
    if (user) fetch(`${api}/kids/${user.email}`).then(res => res.json()).then(setKids);
  }, [user]);
  return /*#__PURE__*/React.createElement("div", {
    className: "kid-cards"
  }, kids?.map(kid => /*#__PURE__*/React.createElement(Infolayout, {
    kid: kid
  })));
};

const AddCard = () => /*#__PURE__*/React.createElement("div", {
  className: "add-kid-card"
}, /*#__PURE__*/React.createElement(Addinglayout, null));

const BookingModal = ({
  show,
  close
}) => /*#__PURE__*/React.createElement("div", {
  className: show ? 'element-visible' : 'element-hidden',
  id: "booking-modal-wrapper"
}, /*#__PURE__*/React.createElement("div", {
  id: "booking-modal"
}, /*#__PURE__*/React.createElement("div", {
  className: "close-button"
}, /*#__PURE__*/React.createElement("button", {
  onClick: close
}, "X"), /*#__PURE__*/React.createElement("h3", null, " Book A Camp ")), /*#__PURE__*/React.createElement(InfoCards, null), /*#__PURE__*/React.createElement(AddCard, null), /*#__PURE__*/React.createElement("div", {
  class: "book-camp-btn"
}, /*#__PURE__*/React.createElement("button", {
  onClick: close
}, "book"))));

export default BookingModal;