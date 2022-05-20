import useForm from './hooks/useForm.js'
import useSessionStorage from './hooks/useSessionStorage.js'
import { api } from './api.js'

const { useState, useEffect, useRef } = React

const Infolayout = ({ kid }) => (
    <div className="kid-info">
        <div className="kid-avatar">
            <img src="../assets/img/kid-pic.jpg" alt="avatar" />
        </div>
        <div className="first-name">
            <p>{ kid.firstName }</p>            
        </div>
        <div className="last-name">
            <p>{ kid.lastName }</p>
         </div>
    </div>
)

const Addinglayout = () => {
    const [visible, setVisible] = useState(false);
    const { 
        register,
        handleSubmit,
        watch
    } = useForm({ dni: "", firstName: "", lastName: "", age: "" });

    const button = useRef(null);
    useEffect(() => {
        const listener = ({ valid }) => button.current.disabled = !valid;
        const sub = watch(listener);
        return () => sub.unsub();
    }, []);

    const [user] = useSessionStorage("user")
    const onSubmit = kid => {
        fetch(`${api}/kid/${user.email}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(kid)
        }).then(_ => setVisible(false));
    }

    return (
        <form className="add-kid-section" onSubmit={handleSubmit(onSubmit)}>
            <div className={visible ? 'element-hidden' : 'element-visible'} id="addButton">
                <input onClick={() => setVisible(!visible)} id="plus-icon" type="image" src="../assets/img/plus-icon.png" alt="plus-icon" />        
            </div>
            <div className={visible ? 'element-visible' : 'element-hidden'} id="kid-avatar" >
                <img src="../assets/img/kid-pic.jpg" alt="avatar" />
            </div>
            <div className={visible ? 'element-visible' : 'element-hidden'} id="IDsection" >
                <input type="text" placeholder="DNI" autoFocus
                    { ...register("dni", {
                        required: true,
                        pattern: /\d{8}[A-Z]/ 
                    }) }/>
            </div>
            <div className={visible ? 'element-visible' : 'element-hidden'} id="complete-name">
                <input type="text" placeholder="First Name" { ...register("firstName", {
                    required: true
                }) } />
                <input type="text" placeholder="Last Name" { ...register("lastName", {
                    required: true
                }) } />
            </div>
            <div className={visible ? 'element-visible' : 'element-hidden'} id="age">
                <input type="text" placeholder="Age" { ...register("age", {
                    required: true,
                    pattern: /[4-9]|1[0-6]/
                }) } />
            </div>
            <button className={visible ? 'element-visible' : 'element-hidden'} ref={button}>Add kid</button>
        </form>
    );
};

const InfoCards = () => {
    const [user] = useSessionStorage("user")
    const [kids, setKids] = useState(null);
    useEffect(() => {
        if (user) fetch(`${api}/kids/${user.email}`)
            .then(res => res.json())
            .then(setKids);
    }, [user])

    return (
        <div className="kid-cards">
            {
                kids?.map(kid => <Infolayout kid={kid} />)
            }
        </div>
    )     
}

const AddCard = () => (
    <div className="add-kid-card">
        <Addinglayout />
    </div>
)


const BookingModal = ({ show, close }) => (
    <div className={show ? 'element-visible' : 'element-hidden'} id="booking-modal-wrapper" >
        <div  id="booking-modal">  
            <div className="close-button">
                <button onClick={close}>X</button>
                <h3> Book A Camp </h3>
            </div>
            <InfoCards />
            <AddCard />
            <div class="book-camp-btn">   
                <button onClick={close}>book</button>
            </div>
        </div>
    </div>
)

export default BookingModal;
