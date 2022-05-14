import useSessionStorage from './hooks/useSessionStorage.js'

const { useEffect } = React;

const NavLink = ({ name, to }) => (
    <li className="navbar-menu-item">
        <a href={to}>{ name }</a>
        <div className="menu-item-line" />
    </li>
)

const Sign = () => (
    <ul className="navbar-sign">
        <li className="navbar-sign-item">
            <a href="/signin">Sign in</a>
        </li>
        <li className="navbar-sign-item">
            <a href="/signup">Sign up</a>
        </li>
    </ul>
)

const User = () => (
    <div className="navbar-user">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 448c-52.93 0-100.9-21.53-135.7-56.29C136.5 349.9 176.5 320 224 320h64c47.54 0 87.54 29.88 103.7 71.71C356.9 426.5 308.9 448 256 448z"/></svg>
    </div>
)

const Nav = () => {
    const [user] = useSessionStorage("user");
    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
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
                { user ? <User /> : <Sign /> }
            </div>
        </nav>
    )
}

const container = document.querySelector("#nav-container");
ReactDOM.createRoot(container).render(<Nav />);
