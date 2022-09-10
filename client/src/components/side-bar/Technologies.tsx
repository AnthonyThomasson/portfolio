import { useRef, useState } from 'react'
import { Technology } from '../../utilities/technologies/api'
import { getTechnologies } from '../../utilities/technologies/utilities'
import './../../styles/Technologies.css'

function Technologies() {
    const searchInput = useRef(null)
    const [technologies, setTechnologies] = useState<Technology[]>([])
    const [technologyResults, setTechnologyResults] =
        useState<Technology[]>(technologies)

    if (technologies.length === 0) {
        getTechnologies()
            .then((technologies: any) => {
                setTechnologies(technologies)
                setTechnologyResults(technologies)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const onSearch = (searchTerm: string) => {
        if (searchTerm === '') {
            setTechnologyResults(technologies)
        } else {
            const newTechnologies = technologies.filter(
                (technology: Technology) =>
                    technology.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            )
            setTechnologyResults(newTechnologies)
        }
    }

    const technologiesHTML = technologyResults.map((technology: Technology) => {
        return (
            <li key={technology.name}>
                <span className="technology-icon" />
                <div className={`technology-description`}>
                    <h1>{technology.name}</h1>
                    <p>{technology.experience}</p>
                </div>
            </li>
        )
    })

    return (
        <div className="technologies-content">
            <input
                type="text"
                placeholder="Search"
                ref={searchInput}
                onChange={(e) => onSearch(e.target.value)}
            />
            <ul className="search-results">{technologiesHTML}</ul>
        </div>
    )
}

export default Technologies
