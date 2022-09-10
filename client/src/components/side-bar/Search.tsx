import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IFileNode, NodeType } from '../../utilities/files/api'
import { getSystemNodes } from '../../utilities/files/utilities'
import './../../styles/Search.css'

function Search(): JSX.Element {
    const navigate = useNavigate()
    const [systemNodes, setSystemNodes] = useState<IFileNode[]>([])
    const [searchResults, setSearchResults] = useState<IFileNode[]>([])

    const searchBarContent = useRef(null)

    if (systemNodes.length === 0) {
        getSystemNodes()
            .then((systemNodes: any) => {
                setSystemNodes(systemNodes)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const onSearch = (searchTerm: string): void => {
        if (searchTerm === '') {
            setSearchResults([])
        } else {
            const results = systemNodes.filter(
                (node) =>
                    node.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) &&
                    node.type === NodeType.File
            )
            setSearchResults(results)
        }
    }

    const onSelection = (id: number): void => {
        if (searchBarContent.current === null) {
            return
        }
        const searchInput = searchBarContent.current as HTMLInputElement
        searchInput.value = ''
        onSearch('')
        navigate(`/file/${id}`)
    }

    const searchResultsHTML = searchResults.map((node: IFileNode) => {
        return (
            <li key={node.id}>
                <div
                    className={`system-node-name`}
                    onClick={() => onSelection(node.id)}
                >
                    <span className={node.icon}></span>
                    <span className="folder-name">{node.name}</span>
                </div>
            </li>
        )
    })

    return (
        <div className="search-content">
            <input
                type="text"
                placeholder="Search"
                ref={searchBarContent}
                onChange={(e) => onSearch(e.target.value)}
            />
            <ul className="search-results">{searchResultsHTML}</ul>
        </div>
    )
}

export default Search
