import CampFilters from './CampFilters.js'
import CampList from './CampList.js'
import { api } from './api.js'

const { useState, useEffect } = React

const Camps = () => {
    // Filters
    const [kinds, setKinds] = useState([])
    const [langs, setLangs] = useState([])
    useEffect(() => {
        fetch(`${api}/camps/kinds`)
            .then(res => res.json())
            .then(({ kinds }) => setKinds(
                kinds.map(kind => ({ name: kind, active: false }))
            ));

        fetch(`${api}/camps/langs`)
            .then(res => res.json())
            .then(({ langs }) => setLangs(
                langs.map(lang => ({ name: lang, active: false }))
            ));
    }, []);

    useEffect(() => {
        console.log({ kinds, langs });
    }, [kinds, langs]);

    const toggle = (options, setOptions) => name => {
        // Is there a more efficient way to toggle an option?
        const target = options.find(k => k.name === name);
        const rest = options.filter(k => k.name !== name);
        
        setOptions([ ...rest, { ...target, active: !target.active }].sort((o1, o2) => o1.name > o2.name));
    }

    const toggleKind = toggle(kinds, setKinds);
    const toggleLang = toggle(langs, setLangs);

    return (
        <>
            <CampFilters 
                kinds={kinds} 
                langs={langs}
                toggleKind={toggleKind}
                toggleLang={toggleLang}
            />
            <CampList kinds={kinds} langs={langs} />
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
