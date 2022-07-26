import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    IFileNode,
    ISystemNode,
    NodeType,
    useSystemNodes,
} from '../../utilities/hooks/useSystemNodes'
import './../../styles/Search.css'

function Search(): JSX.Element {
    const navigate = useNavigate()
    const { nodes } = useSystemNodes()
    const [systemNodes, setSystemNodes] = useState<IFileNode[]>([])
    const [searchResults, setSearchResults] = useState<IFileNode[]>([])

    const searchBarContent = useRef(null)
    useEffect(() => {
        setSystemNodes(
            pipe(
                nodes,
                E.getOrElseW(() => [])
            ).filter(
                (node: ISystemNode) => node.type === NodeType.File
            ) as IFileNode[]
        )
    }, [nodes])

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
                    <span className="folder-path">
                        {'./' + node.breadcrumbs.join('/')}
                    </span>
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
