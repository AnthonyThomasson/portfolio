import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    ISystemNode,
    useSystemNodes,
} from '../../utilities/hooks/useSystemNodes'
import './../../styles/FileExplorer.css'
import './../../styles/SystemNodeIcons.css'
import FileTree from './FileTree'

function FileExplorer(): JSX.Element {
    const params = useParams()
    const navigate = useNavigate()
    const [isExplorerOpen, setExplorerIsOpen] = useState(true)
    const { structure, expandAll, collapseAll, select, loading } =
        useSystemNodes()

    useEffect(() => {
        pipe(
            structure,
            E.mapLeft((err) =>
                console.log(`Structure failed to load: ${err.message}`)
            )
        )
    }, [structure])

    useEffect(() => {
        if (
            loading === false &&
            params.fileId !== undefined &&
            +params.fileId > 0
        ) {
            select(+params.fileId)
        }
    }, [loading, params.fileId])

    return (
        <div className="file-explorer">
            <div className="file-explorer-open">
                <div className="file-explorer-heading">
                    <div
                        className="file-explorer-title"
                        onClick={() => setExplorerIsOpen(!isExplorerOpen)}
                    >
                        <span
                            className={`chevron fa-solid ${
                                isExplorerOpen
                                    ? 'fa-chevron-down'
                                    : 'fa-chevron-right'
                            }`}
                        ></span>
                        PORTFOLIO
                    </div>
                    <ul className="file-explorer-buttons">
                        <li>
                            <button
                                className="file-explorer-button"
                                onClick={() => expandAll()}
                            >
                                +
                            </button>
                        </li>
                        <li>
                            <button
                                className="file-explorer-button"
                                onClick={() => collapseAll()}
                            >
                                -
                            </button>
                        </li>
                        <li>
                            <button className="file-explorer-button">0</button>
                        </li>
                    </ul>
                </div>
                <div
                    className={`file-explorer-content ${
                        isExplorerOpen ? 'file-explorer-content-active' : ''
                    }`}
                >
                    <FileTree
                        structure={pipe(
                            structure,
                            E.getOrElse(() => [] as ISystemNode[])
                        )}
                        onFolderSelected={(folderId: number): void => {
                            select(folderId)
                        }}
                        onFileSelected={(fileId: number): void => {
                            navigate(`/file/${fileId}`)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default FileExplorer
