import { api } from './api.js'
import { curry, and } from './utils.js'

const { useState, useEffect } = React

const LocationIcon = () => (
    <div className="location-icon">
        <img src="../assets/img/gps-icon.png" alt="" />
    </div>
)

const randBetween = (low, high) => Math.floor(Math.random() * high + low)
const CampCard = ({ camp }) => {
    return (
        <div className="camp-card">
            <div className="card-img">
                <img src={ camp.img } alt="Camp image" />
            </div>
            <div className="card-info">
                <h2>{ camp.name }</h2>
                <span>
                    <LocationIcon />
                    { camp.location }
                </span>
            </div>
        </div>
    )
}

const CampList = ({ kinds, langs }) => {
    const [camps, setCamps] = useState([])
    const [filteredCamps, setFilteredCamps] = useState([])
    useEffect(() => {
        console.log(filteredCamps)
        fetch(`${api}/camps`)
            .then(res => res.text())
            .then(text => (new window.DOMParser()).parseFromString(text, "text/xml"))
            .then(xml => Array.from(xml.firstChild.children).map(parseCamp))
            .then(camps => {
                setCamps(camps)
                setFilteredCamps(camps)
            })
    }, [])

    const parseCamp = camp => Array.from(camp.children)
        .reduce((acc, child) => ({ 
            ...acc, 
            [child.localName]: child.textContent 
        }), { img: `../assets/img/camp-card${randBetween(1, 8)}.jpg` })

    const [search, setSearch] = useState("")
    const handleSearchBar = e => setSearch(e.target.value)

    const byName = curry((name, camp) => camp.name.toLowerCase().includes(name))
    const emptyOrSameProp = curry((prop, opts, camp) =>
        opts.length === 0 || opts.find(opt => opt.name === camp[prop]))
    const byKind = emptyOrSameProp("kind", kinds);
    const byLang = emptyOrSameProp("lang", langs);

    useEffect(() => {
        // We could query from the database again, but we opt for this implementation because of 
        // its simplicity and because we have little time left.
        setFilteredCamps(camps.filter(and(byName(search), byKind, byLang)))
    }, [kinds, langs, search]);

    return (
        <div class="camp-list">
            <div class="search">
                <input type="text" placeholder="Search a Camp or a Direction"
                    onChange={handleSearchBar} value={search} />
            </div>
            <div class="camps-cards">
                { filteredCamps.map(camp => <CampCard camp={camp} />) }
            </div>
        </div>
    )
}

export default CampList
