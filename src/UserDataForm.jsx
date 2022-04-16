const UserDataForm = ({ handleSubmit }) => (
    <form onSubmit={handleSubmit}>
        <h4>Already a member? <a href="signin">Sign In</a></h4>
        <div class="signupInfo">
            <div class="signuptitle">
                <h1> Sign up to Our Camp</h1>
            </div>
            <div class="signupsubtitle">
                <hr />
                <h5>SignUp</h5>
                <hr />
            </div>
            <div class="name-lastname">
                <div id="Dname" class="Name">
                    <label for="username">Name</label>
                    <input type="text" name="Name" id="Name" />
                </div>

                <div id="DLname" class="LastName">
                    <label for="LastName">LastName</label>
                    <input type="text" name="LastName" id="LastName" />
                </div>
            </div>
            <div class="telephone">
                <div id="negative" class="NegativeNumber">
                    <label for="NegativeNumber">Phone</label>
                    <input type="text" value=" +34 " name="NegativeNumber" id="NegativeNumber" />
                </div>
                <div id="number" class="PhoneNumber">
                    <label for="PhoneNumber"> Number</label>
                    <input type="tel" name="PhoneNumber" id="PhoneNumber" placeholder="123456789" />
                </div>
            </div>

            <div class="Adress">
                <label for="Adress">Adress</label>
                <input type="text" name="Adress" id="Adress" placeholder="Calle zumardia n16" />
            </div>

            <div class="button">
                <button>Create Account</button>
            </div>
        </div>
    </form>
)

export default UserDataForm

