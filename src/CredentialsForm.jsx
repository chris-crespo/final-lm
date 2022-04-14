const CredentialsForm = ({ handleSubmit }) => (
    <form onSubmit={handleSubmit}>
        <h4>Already a member? <a href="http://localhost:3000/signin">Sign In</a></h4>
        <div class="signupInfo">
            <div class="signuptitle">
                <h1> Sign up to Our Camp</h1>
            </div>
            <div class="signupsubtitle">
                <hr />
                <h5>SignUp</h5>
                <hr />
            </div>           
            <div class="username">
                <label for="username">Username</label>
                <input type="text" name="userName" id="username" />
            </div>
            <div class="email">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" />
            </div>
            <div class="password">
                <label for="passwored">Password</label>
                <input type="password" name="passwored" id="password" placeholder="6+ caracters" />
            </div>
            <div class="button">
                <button>Create Account</button>
            </div>
        </div>
    </form>
)

export default CredentialsForm
