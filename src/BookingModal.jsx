const BookingModal = () => {
    return (
        <>
            <div className="add-kid-section">
                <div className="kid-card">
                    <div className="kid-avatar">
                        <img src="" alt="" />
                    </div>
                    <div className="IDsection">
                        <label for="DNI">DNI</label>
                        <input type="text" placeholder="DNI" />
                    </div>
                    <div className="complete-name">
                        <label for="">Complete Name</label>
                        <input type="text" placeholder="First Name" />
                        <input type="text" placeholder="Last Name" />
                    </div>
                </div>
                <div className="kid-card"></div>
                <div className="kid-card adding-card">
                    <div className="IDsection">
                        <label for="DNI">DNI</label>
                        <input type="text" placeholder="DNI" />
                    </div>
                    <div className="complete-name">
                        <label for="">Complete Name</label>
                        <input type="text" placeholder="First Name" />
                        <input type="text" placeholder="Last Name" />
                    </div>
                    <div className="age">
                        <label for="age">Age</label>
                        <input type="text" placeholder="Age" />
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default BookingModal;