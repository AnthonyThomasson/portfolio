import { IFileNode } from '../../utilities/hooks/useSystemNodes'

function Tabs(props: {
    onTabRemove: OnTabRemove
    onTabSelected: OnTabSelected
    selectedFileId?: number
    tabs?: { [id: number]: IFileNode }
}): JSX.Element {
    const selectedFileId = props.selectedFileId ?? 0
    const tabs = props.tabs ?? []

    const tabsHTML = Object.entries(tabs).map((tab) => {
        const file = tab[1]

        return (
            <li
                key={selectedFileId === file.id ? -file.id : file.id}
                className={`tab ${
                    selectedFileId === file.id ? 'tab-active' : ''
                }`}
                onClick={() => props.onTabSelected(file.id)}
            >
                <span className={`${file.icon}`} />
                <span className="tab-name">{file.name}</span>
                <button
                    className="tab-close"
                    onClick={(e) => {
                        e.stopPropagation()
                        props.onTabRemove(file.id)
                    }}
                >
                    X
                </button>
            </li>
        )
    })

    return <ul className="tabs">{tabsHTML}</ul>
}

type OnTabRemove = (id: number) => void
type OnTabSelected = (id: number) => void

export default Tabs
