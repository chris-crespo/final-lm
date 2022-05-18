import useSessionStorage from './hooks/useSessionStorage.js'
import BookingModal from './BookingModal.js'
import { api } from './api.js'

const { useState, useEffect } = React

const Camp = () => {
    const [camp, setCamp] = useState(null)
    const [activities, setActivities] = useState(null)
    const [storedCamp] = useSessionStorage("camp");
    useEffect(() => {
        if (storedCamp) {
            fetch(`${api}/camp/${storedCamp.id}`)
                .then(res => res.json())
                .then(setCamp);
            
            fetch(`${api}/activities/${storedCamp.id}`)
                .then(res => res.json())
                .then(setActivities);
        }
    }, [storedCamp]);

    const [modalVisible, setModalVisible] = useState(false);
    const showModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    return (
        <>
            <div className="main-container">
                <div className="camp-pic-container">
                    <div className="camp-pic">
                        <img src="../assets/img/camp-card1.jpg" alt="camp-pic" />
                    </div>

                </div>
                <div className="camp-info">
                    <div className="camp-title">
                        <h1>{camp?.name}</h1>
                    </div>
                    <div className="camp-location">
                        <div className="gps-icon">
                            <img src="../assets/img/gps-icon.png" alt="" />
                        </div>
                        <h2>{camp?.location}</h2>
                    </div>

                    <div className="camp-description">
                        <p>{camp?.description}</p>
                    </div>
                    <div className="camp-filters">
                        <div className="camp-type">
                            <div className="type-icon">
                                <img src="../assets/img/type-icon.png" alt="type-icon" />
                            </div>
                            <h4>Kind |</h4>
                            <p>{camp?.kind}</p>
                        </div>
                        <div className="permited-age">
                            <div className="age-icon">
                                <img src="../assets/img/age-icon.png" alt="age-icon" />
                            </div>
                            <h4>Age |</h4>
                            <p>{camp?.minAge} - {camp?.maxAge} years</p>
                        </div>
                        <div className="camp-languages">
                            <div className="language-icon">
                                <img src="../assets/img/languages-icon.png" alt="languages-icon" />
                            </div>
                            <h4>Languages |</h4>
                            <p>{(camp?.languages || []).join(", ")}</p>
                        </div>
                    </div>
                    <div className="booking">
                        <button onClick={showModal}>Booking</button>
                    </div>
                </div>
                <div className="camp-activities">
                    <div className="activity-title">
                        <h1>ACTIVITIES</h1>
                    </div>
                    <div className="activity-container">
                        {
                            activities?.map(activity => (
                                <div className="activity-card">
                                    <div className="activity-pic">
                                        <img src="../assets/img/icons8-surf-50.png" alt="activity-pic" />
                                    </div>
                                    <p>{activity}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <BookingModal show={modalVisible} close={closeModal} />
        </>
    )
} 
const container = document.querySelector("#wrapper");
ReactDOM.createRoot(container).render(<Camp />);
