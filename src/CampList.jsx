import useSessionStorage from './hooks/useSessionStorage.js'
import { api } from './api.js'
import { curry, and } from './utils.js'
import to from './redirect.js'

const { useState, useEffect } = React

const Icon = ({ name }) => (
    <div className="location-icon">
        <img src={`../assets/img/${name}-icon.png`} alt="" />
    </div>
)

const randBetween = (low, high) => Math.floor(Math.random() * high + low)
const CampCard = ({ camp }) => {
    const [_, storeCamp] = useSessionStorage("camp", { id: 0 })
    const redirectToCamp = () => {
        storeCamp({ id: camp.id })
        to("/camp");
    }

    return (
        <div className="camp-card" onClick={redirectToCamp}>
            <div className="card-img">
                <img src={ camp.img } alt="Camp image" />
            </div>
            <div className="card-info">
                <h2>{ camp.name }</h2>
                <div className="card-info-items">
                    <span>
                        <Icon name="gps" />
                        { camp.location }
                    </span>
                    |
                    {/* TODO: Add more icons */}
                    <span>
                        { camp["min-age"] } - { camp["max-age"] } years
                    </span>
                    |
                    <span>
                        { camp.kind } 
                    </span>
                        
                </div>
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

    const parseLangs = langs => Array.from(langs).map(lang => lang.textContent)
    const parseCamp = camp => Array.from(camp.children)
        .reduce((acc, child) => ({ 
            ...acc, 
            [child.localName]: child.localName === "langs" 
                ? parseLangs(child.children)
                : child.textContent 
        }), { img: `../assets/img/camp-card${randBetween(1, 8)}.jpg` })

    const [search, setSearch] = useState("")
    const handleSearchBar = e => setSearch(e.target.value)

    const byName = curry((name, camp) => camp.name.toLowerCase().includes(name))
    const emptyOr = curry((thunk, opts, camp) => opts.length === 0 || thunk(camp))

    const sameNameAs = curry((n1, { name }) => n1 === name)
    const byKind = emptyOr(camp => kinds.find(sameNameAs(camp.kind)))
    const byLang = emptyOr(camp => camp.langs.some(lang => langs.find(sameNameAs(lang))))

    useEffect(() => {
        // We could query from the database again, but we opt for this implementation because of 
        // its simplicity and because we have little time left.
        setFilteredCamps(camps.filter(and(byName(search), byKind(kinds), byLang(langs))))
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
