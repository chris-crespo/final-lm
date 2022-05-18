import useSessionStorage from "./hooks/useSessionStorage.js"
import to from './redirect.js'

const Icon = ({ name }) => (
    <div className="location-icon">
        <img src={`../assets/img/${name}-icon.png`} alt="" />
    </div>
)

const CampCard = ({ camp }) => {
    const [_, storeCamp] = useSessionStorage("camp", { id: 1 })
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

export default CampCard;
