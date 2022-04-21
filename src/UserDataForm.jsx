const { useState } = React;

const UserDataForm = ({ register }) => {
    const updateField = setter => e => setter(e.target.value);

    const [firstName, setFirstName] = useState("");
    const updateFirstName = updateField(setFirstName);

    const [lastName, setLastName] = useState("");
    const updateLastName = updateField(setLastName);

    const [phoneNumber, setPhoneNumber] = useState("");
    const updatePhoneNumber = updateField(setPhoneNumber);

    const handleSubmit = e => {
        e.preventDefault();
        register({ firstName, lastName, phoneNumber }); 
    }

    return (
        <form onSubmit={handleSubmit}>
            <div class="form-title">
                <h1><span>Sign up</span> to Our Camp</h1>
            </div>
            <div class="form-field"> 
                <label for="first-name">First Name</label>
                <input type="text" name="first-name" autoFocus
                       value={firstName} onChange={updateFirstName}/>
            </div>

            <div class="form-field">
                <label for="last-name">Last Name</label>
                <input type="text" name="last-name" value={lastName} onChange={updateLastName} />
            </div>
            <div class="form-field">
                <label for="phone-number">Phone Number</label>
                <input type="tel" name="phone-number" value={phoneNumber} onChange={updatePhoneNumber} />
            </div>
            <div class="form-button-wrapper">
                <button>Create Account</button>
            </div>
        </form>
    )
}

export default UserDataForm

