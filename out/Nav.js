import useApi from './hooks/useApi.js';
import useSessionStorage from './hooks/useSessionStorage.js';
import { api } from './api.js';
const {
  useState,
  useEffect
} = React;

const NavLink = ({
  name,
  to
}) => /*#__PURE__*/React.createElement("li", {
  className: "navbar-menu-item"
}, /*#__PURE__*/React.createElement("a", {
  href: to
}, name), /*#__PURE__*/React.createElement("div", {
  className: "menu-item-line"
}));

const Sign = () => /*#__PURE__*/React.createElement("ul", {
  className: "navbar-sign"
}, /*#__PURE__*/React.createElement("li", {
  className: "navbar-sign-item"
}, /*#__PURE__*/React.createElement("a", {
  href: "/signin"
}, "Sign in")), /*#__PURE__*/React.createElement("li", {
  className: "navbar-sign-item"
}, /*#__PURE__*/React.createElement("a", {
  href: "/signup"
}, "Sign up")));

const User = ({
  toggle,
  user,
  loadBookings
}) => {
  const [_, result] = useApi(`${api}/bookings/${user.id}`);
  useEffect(() => {
    loadBookings(result?.json().bookings);
  }, [result]);
  return /*#__PURE__*/React.createElement("div", {
    className: "navbar-user",
    onClick: toggle
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 448c-52.93 0-100.9-21.53-135.7-56.29C136.5 349.9 176.5 320 224 320h64c47.54 0 87.54 29.88 103.7 71.71C356.9 426.5 308.9 448 256 448z"
  })));
};

const Sidebar = ({
  toggled,
  close,
  user,
  bookings
}) => /*#__PURE__*/React.createElement("div", {
  className: `sidebar-container ${toggled ? "show" : "hide"}`,
  onClick: close
}, /*#__PURE__*/React.createElement("div", {
  className: "sidebar"
}, /*#__PURE__*/React.createElement("div", {
  className: "sidebar-header"
}, /*#__PURE__*/React.createElement("h1", null, "My Profile")), /*#__PURE__*/React.createElement("div", {
  className: "sidebar-user"
}, /*#__PURE__*/React.createElement("div", {
  className: "user-img"
}, /*#__PURE__*/React.createElement("img", {
  src: "../assets/img/kid-pic.jpg",
  alt: ""
})), /*#__PURE__*/React.createElement("h1", null, user?.name)), /*#__PURE__*/React.createElement("div", {
  className: "sidebar-bookings"
}, /*#__PURE__*/React.createElement("div", {
  className: "sidebar-bookings-header"
}, /*#__PURE__*/React.createElement("h1", null, "Last Bookings")), /*#__PURE__*/React.createElement("div", {
  className: "sidebar-bookings-list"
}, bookings?.map(b => /*#__PURE__*/React.createElement("div", {
  className: "sidebar-booking"
}, b.camp)) || /*#__PURE__*/React.createElement("div", {
  className: "sidebar-bookings-empty"
}, "There are no bookings to show.")))));

const Hamburger = ({
  toggle
}) => /*#__PURE__*/React.createElement("div", {
  className: "nav-hamburger",
  onClick: toggle
}, /*#__PURE__*/React.createElement("div", {
  className: "hamburger-row"
}), /*#__PURE__*/React.createElement("div", {
  className: "hamburger-row"
}));

const Close = ({
  close
}) => /*#__PURE__*/React.createElement("div", {
  className: "nav-close",
  onClick: close
}, /*#__PURE__*/React.createElement("div", {
  className: "close-row"
}), /*#__PURE__*/React.createElement("div", {
  className: "close-row"
}));

const Menu = ({
  toggled,
  close
}) => /*#__PURE__*/React.createElement("div", {
  className: `menu-container ${toggled ? "show" : "hide"}`
}, /*#__PURE__*/React.createElement(Close, {
  close: close
}), /*#__PURE__*/React.createElement("ul", {
  className: "menu"
}, /*#__PURE__*/React.createElement(NavLink, {
  name: "Home",
  to: "/"
}), /*#__PURE__*/React.createElement(NavLink, {
  name: "Camps",
  to: "/camps"
}), /*#__PURE__*/React.createElement(NavLink, {
  name: "About",
  to: "/about"
})));

const Nav = () => {
  const [user] = useSessionStorage("user");
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => setSidebar(!sidebar);

  const closeSidebar = () => setSidebar(false);

  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState(null);
  const [menu, toggleMenu] = useState(false);

  const open = () => toggleMenu(true);

  const close = () => toggleMenu(false);

  const loadBookings = bookings => {
    setLoading(false);
    setBookings(bookings);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("nav", {
    className: "navbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "navbar-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "navbar-logo"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/img/logoC.png",
    alt: "Nav logo"
  })), /*#__PURE__*/React.createElement("ul", {
    className: "navbar-menu"
  }, /*#__PURE__*/React.createElement(NavLink, {
    name: "Home",
    to: "/"
  }), /*#__PURE__*/React.createElement(NavLink, {
    name: "Camps",
    to: "/camps"
  }), /*#__PURE__*/React.createElement(NavLink, {
    name: "About",
    to: "/about"
  }))), /*#__PURE__*/React.createElement(Hamburger, {
    toggle: open
  }), /*#__PURE__*/React.createElement("div", {
    className: "navbar-right"
  }, user ? /*#__PURE__*/React.createElement(User, {
    user: user,
    toggle: toggleSidebar,
    loadBookings: loadBookings
  }) : /*#__PURE__*/React.createElement(Sign, null))), /*#__PURE__*/React.createElement(Sidebar, {
    toggled: sidebar,
    close: closeSidebar,
    user: user,
    bookings: bookings
  }), /*#__PURE__*/React.createElement(Menu, {
    toggled: menu,
    close: close
  }));
};

const container = document.querySelector("#nav-container");
ReactDOM.createRoot(container).render( /*#__PURE__*/React.createElement(Nav, null));