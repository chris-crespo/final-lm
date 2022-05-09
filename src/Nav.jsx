const NavLink = ({ name, to }) => (
    <li className="navbar-menu-item">
        <a href={to}>{ name }</a>
        <div className="menu-item-line" />
    </li>
)

const Nav = () => (
    <nav className="navbar">
        <div className="navbar-left">
            <div className="navbar-logo">
                <img src="../assets/img/logoC.png" alt="Nav logo" />
            </div>
            <ul className="navbar-menu">
                <NavLink name="Home" to="/" /> 
                <NavLink name="Camps" to="/camps" /> 
                <NavLink name="About" to="/about" /> 
            </ul>
        </div>

        <div className="navbar-right">
            <ul className="navbar-sign">
                <li className="navbar-sign-item">
                    <a href="/signin">Sign in</a>
                </li>
                <li className="navbar-sign-item">
                    <a href="/signup">Sign up</a>
                </li>
            </ul>
        </div>
    </nav>
);

const container = document.querySelector("#nav-container");
ReactDOM.createRoot(container).render(<Nav />);
