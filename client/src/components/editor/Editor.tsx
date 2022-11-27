import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { IFileNode, useSystemNodes } from '../../utilities/hooks/useSystemNodes'
import './../../styles/Editor.css'
import Home from './Home'
import SelectedFile from './SelectedFile'
import Tabs from './Tabs'

function Editor(props: { unknownPath?: boolean }): JSX.Element {
    const navigator = useNavigate()
    const params = useParams()
    const fileId = params.fileId !== undefined ? +params.fileId : 0

    const [tabs, setTabs] = useState<{ [id: number]: IFileNode }>({})
    const [selectedTabId, setSelectedTabId] = useState<number>(0)
    const [selectedHistory, setSelectedHistory] = useState<number[]>([])

    const { nodes } = useSystemNodes()

    useEffect(() => {
        if (fileId > 0) {
            if (tabs[fileId] === undefined) {
                const fileNodes = pipe(
                    nodes,
                    E.getOrElseW(() => [])
                ).filter((node) => node.id === fileId) as IFileNode[]

                if (fileNodes.length > 0) {
                    const fileNode = fileNodes[0]
                    setTabs({ ...tabs, [fileNode.id]: fileNode })
                }
            }
        }
        if (selectedTabId > 0) {
            const history = [
                selectedTabId,
                ...selectedHistory.filter(
                    (itemId) => itemId !== selectedTabId && itemId !== fileId
                ),
            ]
            setSelectedHistory(history)
        }
        setSelectedTabId(fileId)
    }, [fileId, nodes])

    const contentHTML =
        tabs[fileId] !== undefined ? (
            <SelectedFile file={tabs[fileId]} />
        ) : (
            <Home />
        )

    return (
        <div className="editor">
            <Tabs
                tabs={tabs}
                selectedFileId={fileId}
                onTabRemove={(id: number) => {
                    const newTabs = { ...tabs }
                    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                    delete newTabs[id]
                    setTabs(newTabs)
                }}
                onTabSelected={(id: number) => {
                    navigator(`/file/${id}`)
                }}
            />
            {contentHTML}
        </div>
    )
}

export default Editor
