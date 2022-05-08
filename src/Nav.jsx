const Nav = () => (
    <nav>
        <ul>
            <li id="navLogo">
                <img src="../assets/img/logoC.png" alt="Nav logo" />
            </li>
        </ul>
        <ul>
            <li><a href="">HOME</a></li>
            <li><a href="">CAMPS</a></li>
            <li><a href="">ABOUT</a></li>

            <li id="signin"><a href="/signin">SignIn</a></li>
            <li id="signup"><a href="/signup">SignUp</a></li>
        </ul>
    </nav>
);

const container = document.querySelector("#nav-container");
ReactDOM.createRoot(container).render(<Nav />);
