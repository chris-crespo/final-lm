const Filter = ({ title, children }) => (
    <section className="filter">
        <h4 className="filter-title">{title}</h4>
        { children }
    </section>
)

const OptionsFilter = ({ title, options, toggle }) => (
    <Filter title={title}>
        <div className="camp-filter-options">
            { options.map(option => 
                <span className={`camp-filter-option ${option.active ? "active" : ""}`}
                    onClick={toggle.bind(null, option.name)}>
                        {option.name}
                </span>) }
        </div>
    </Filter>
)

const CampFilters = ({ kinds, langs, toggleKind, toggleLang }) => {
    return (
        <div className="filters">
            <OptionsFilter
                 title="Kinds"
                 options={kinds}
                 toggle={toggleKind}
            /> 
            <OptionsFilter
                 title="Languages"
                 options={langs}
                 toggle={toggleLang} />
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
