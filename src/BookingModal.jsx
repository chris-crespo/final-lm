const Infolayout = ({ firstname,lastname }) => 
    (
        <div className="kid-info">
            <div className="kid-avatar">
                <img src="../assets/img/kid-pic.jpg" alt="avatar" />
            </div>
            <div className="first-name">
                <p>{ firstname }</p>            
            </div>
            <div className="last-name">
                <p>{ lastname }</p>
             </div>
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
                        <input type="text" placeholder="DNI" />
                    </div>
                    <div className={visible ? 'element-visible' : 'element-hidden'} id="complete-name">
                        <input type="text" placeholder="First Name" />
                        <input type="text" placeholder="Last Name" />
                    </div>
                    <div className={visible ? 'element-visible' : 'element-hidden'} id="age">
                        <input type="text" placeholder="Age" />
                    </div>
                    <button className={visible ? 'element-visible' : 'element-hidden'}>Add kid</button>
            </div>
    );
};

const InfoCards = () => 
     (
                <div className="kid-cards">
                    <Infolayout firstname="Juan" lastname="Perez" />
                    <Infolayout firstname="Adrian" lastname="Perez" />
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