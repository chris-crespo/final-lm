import { api } from './api.js'

const { useState, useEffect } = React

const LocationIcon = () => (
    <div className="location-icon">
        <img src="../assets/img/camp-card1.jpg" alt="" />
    </div>
)

const randBetween = (low, high) => Math.random() * high + low
const CampCard = ({ camp }) => {
    return (
        <div className="camp-card">
            <div className="card-img">
                <img src={`../assets/img/camp-card${randBetween(1, 8)}`} alt="Camp image" />
            </div>
            <h2>{ camp.name }</h2>
            <div className="card-info">
                <span>
                    <LocationIcon />
                    { camp.location }
                </span>
            </div>
        </div>
    )
}

const CampList = () => {
    const [camps, setCamps] = useState([])
    useEffect(() => {
        fetch(`${api}/camps`)
            .then(res => res.text())
            .then(text => (new window.DOMParser()).parseFromString(text, "text/xml"))
            .then(console.log)
    }, [])

    return (
        <div class="camps-kids">
            <div class="camps">
                <div class="navigating-head">

                    <input type="text" placeholder="Search a Camp or a Direction" />
                    <button id="search-button">Search</button>
                </div>
                <div class="camps-cards">
                    { camps.map(camp => <CampCard camp={camp} />) }
                </div>
            </div>
        </div>
    )
}

export default CampList
