import CampFilters from './CampFilters.js'
import CampList from './CampList.js'

const Camps = () => {
    return (
        <>
            <CampFilters />
            <CampList />
            <div class="logged-section">
                <div class="logged-header">
                    <h1>My Profile</h1>
                    <div class="close-button">
                        <img src="../assets/img/close-icon.png" alt="" />
                    </div>
                </div>
                <div class="profile-pic">
                    <div class="picture">
                        <img src="../assets/img/kid-pic.jpg" alt="" />
                    </div>
                    <h1>Victory William</h1>
                    <p>Premuim Member
                        <div class="crown"><img src="../assets/img/crown.png" alt=""/></div>
                    </p>
                </div>
                <div class="curent-location">
                    <div class="current-location-img">
                        <img src="../assets/img/profile-city.jpg" alt="" />
                    </div>
                    <div class="current-location-text">
                        <div class="icon"><img src="../assets/img/info-icon.png" alt=""/></div>
                        <p>Current Place</p>
                        <div id="address"></div>
                        
                            <div class="gpsicon">
                                <img src="../assets/img/gps-icon.png" alt=""/>
                            </div>
                            <p>
                            San Sebastian
                        </p>
                    </div>
                </div>
                <div class="loged-bg">
                    <img src="../assets/img/profile-bg.png" alt="" />
                </div>
            </div>
        </>
    )
}

const container = document.querySelector(".camps-wrapper");
ReactDOM.createRoot(container).render(<Camps />);
