import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { useState } from 'react'
import { ISystemNode } from '../../utilities/files/api'
import { useSystemNodes } from '../../utilities/hooks/useSystemNodes'
import './../../styles/FileExplorer.css'
import './../../styles/SystemNodeIcons.css'
import FileTree from './FileTree'

function FileExplorer(): JSX.Element {
    // const params = useParams()
    // const navigation = useNavigate()
    const [isExplorerOpen, setExplorerIsOpen] = useState(true)
    const { structure, expandAll, collapseAll } = useSystemNodes()

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
                        onFolderSelected={() => {}}
                        onFileSelected={() => {}}
                    />
                </div>
            </div>
        </div>
    )
}

export default FileExplorer
