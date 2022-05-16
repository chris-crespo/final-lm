import CampCard from './CampCard.js'
import { api } from './api.js'

const { useState, useEffect } = React

const CampsShowCase = () => {
    const [camps, setCamps] = useState(null)
    useEffect(() => {
        fetch(`${api}/camps`)
            .then(res => res.text())
            .then(text => (new window.DOMParser()).parseFromString(text, "text/xml"))
            .then(xml => Array.from(xml.firstChild.children).map(parseCamp))
            .then(camps => {
                setCamps(camps)
            })
    }, [])

    const randBetween = (low, high) => Math.floor(Math.random() * high + low)

    const parseLangs = langs => Array.from(langs).map(lang => lang.textContent)
    const parseCamp = camp => Array.from(camp.children)
        .reduce((acc, child) => ({ 
            ...acc, 
            [child.localName]: child.localName === "langs" 
                ? parseLangs(child.children)
                : child.textContent 
        }), { img: `../assets/img/camp-card${randBetween(1, 8)}.jpg` })


    return camps ? 
        (
            <>
                <CampCard camp={camps[0]} />
                <CampCard camp={camps[1]} />
                <CampCard camp={camps[2]} />
            </>
        ) : (
            <div>Loading...</div>
        )

}

const container = document.querySelector("#camps-showcase")
ReactDOM.createRoot(container).render(<CampsShowCase />);
