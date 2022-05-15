const Infolayout = ({ firstname,lastname,age }) => 
    (
        <div className="kid-info">
            <div className="kid-avatar">
                <img src="../assets/img/kid-pic.jpg" alt="avatar" />
            </div>
            <div className="first-name">
                <h3>First Name</h3>
                <p>{ firstname }</p>            
            </div>
            <div className="last-name">
                <h3>Last Name</h3>
                <p>{ lastname }</p>
             </div>
             <div className="age">
                <h3>Age</h3>
                <p>{ age }</p>
            </div>
            <button>Reserve camp</button>
        </div>
    )
const Addinglayout = () => {
    const [visible, setVisible] = React.useState(false);
    return (
            <div className="add-kid-section" >
                <style>{`

.element-visible { display: flex }
.element-hidden { display: none }

`}</style>
                
                <div className={visible ? 'element-hidden' : 'element-visible'} id="addButton">
                        <input onClick={() => setVisible(!visible)} id="plus-icon" type="image" src="../assets/img/plus-icon.png" alt="plus-icon" />              
                </div>
                
                    <div className={visible ? 'element-visible' : 'element-hidden'} id="kid-avatar" >
                        <img src="../assets/img/kid-pic.jpg" alt="avatar" />
                    </div>
                    <div className={visible ? 'element-visible' : 'element-hidden'} id="IDsection" >
                        <label for="DNI">DNI</label>
                        <input type="text" placeholder="DNI" />
                    </div>
                    <div className={visible ? 'element-visible' : 'element-hidden'} id="complete-name">
                        <label for="">Complete Name</label>
                        <input type="text" placeholder="First Name" />
                        <input type="text" placeholder="Last Name" />
                    </div>
                    <div className={visible ? 'element-visible' : 'element-hidden'} id="age">
                        <label for="age">Age</label>
                        <input type="text" placeholder="Age" />
                    </div>
                    <button className={visible ? 'element-visible' : 'element-hidden'}>Add kid</button>
            </div>
    );
};

const InfoCards = () => 
     (
                <div className="kid-cards">
                    <Infolayout firstname="Juan" lastname="Perez" age="9" />
                    <Infolayout firstname="Adrian" lastname="Perez" age="14" />
                </div>
    )     

const AddCard = () => (
    <div className="add-kid-card">
        <Addinglayout />
    </div>
)


const BookingModal = () => {
    const [visible, setVisible] = React.useState(true);
    return (
    <div className={visible ? 'element-visible' : 'element-hidden'} id="booking-modal">
        <div className="close-button">
            <button onClick={() => setVisible(!visible)}>X</button>
        </div>
        <InfoCards />
        <AddCard />
    </div>
    )
    
}
const container = document.querySelector("#booking-modal-wrapper");
ReactDOM.createRoot(container).render(<BookingModal />);
// export default BookingModal;