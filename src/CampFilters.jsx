const { useState, useEffect } = React
import { api } from './api.js'

const Filter = ({ title, children }) => (
    <section className="filter">
        <h4 className="filter-title">{title}</h4>
        { children }
    </section>
)

const OptionsFilter = ({ title, options }) => (
    <Filter title={title}>
        <div className="camp-filter-options">
            { options.map(option => <span className="camp-filter-option">{option}</span>) }
        </div>
    </Filter>
)

const CampKindFilter = () => {
    const [kinds, setKinds] = useState([])
    useEffect(() => {
        fetch(`${api}/camps/kinds`)
            .then(res => res.json())
            .then(({ kinds }) => setKinds(kinds))
    }, [])
    
    return <OptionsFilter title="Kinds" options={kinds} />
}

const CampLangFilter = () => {
    const [langs, setLangs] = useState([])
    useEffect(() => {
        fetch(`${api}/camps/langs`)
            .then(res => res.json())
            .then(({ langs }) => setLangs(langs))
    }, [])
    
    return <OptionsFilter title="Languages" options={langs} />
}

const CampFilters = () => {
    return (
        <div className="filters">
            <CampKindFilter /> 
            <CampLangFilter />
            <div id="root"></div>

        {/* 
        <div class="filters-img">
            <img src="../assets/img/Filter-pic.png" alt="filter pic" />
            <div class="filters-img-text">
                <h1>Start Your Adventure</h1>
                <span id="arrow"></span>
                <p>Create adventure for your kids</p>
            </div>

        </div>
        <div class="logout">
            <h2><img src="../assets/img/logout.png" alt="logout image" /> Logout</h2>
        </div>
        */}
        </div>
    )
}

export default CampFilters;
