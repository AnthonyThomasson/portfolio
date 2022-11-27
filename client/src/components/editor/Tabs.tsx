import { IFileNode } from '../../utilities/hooks/useSystemNodes'

function getPathPrefix(
    tabs: { [id: number]: IFileNode },
    selectedFile: IFileNode
): string {
    let duplicateName = false
    for (const id in tabs) {
        if (
            tabs[id].name === selectedFile.name &&
            tabs[id].id !== selectedFile.id
        ) {
            duplicateName = true
        }
    }
    if (!duplicateName) {
        return ''
    }

    if (selectedFile.breadcrumbs.length === 1) {
        const folder = selectedFile.breadcrumbs[0]
        return `./${folder}`
    }

    if (selectedFile.breadcrumbs.length > 1) {
        const lastFolder =
            selectedFile.breadcrumbs[selectedFile.breadcrumbs.length - 1]
        return `../${lastFolder}`
    }
    return './'
}

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
                <span className="tab-path">{getPathPrefix(tabs, file)}</span>
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
