const LoginBanner = ({ render, success }) => {
    const classNames = [
        "login-banner", 
        render ? "show" : "hide",
        success ? "success" : "failure"
    ];
        
    return (
        <div className={classNames.join(" ")}>
            <p>{ success ? "Logged In!" : "Failed to login" }</p>
        </div>
    )
};

export default LoginBanner;
