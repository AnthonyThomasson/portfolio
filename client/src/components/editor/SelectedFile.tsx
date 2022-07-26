import DOMPurifier from 'dompurify'
import { marked } from 'marked'
import { IFileNode } from '../../utilities/hooks/useSystemNodes'

function SelectedFile(props: { file: IFileNode }): JSX.Element {
    const contentHTML = DOMPurifier.sanitize(marked.parse(props.file.content))

    return (
        <div className="selected-file">
            <div
                dangerouslySetInnerHTML={{
                    __html: contentHTML,
                }}
            ></div>
        </div>
    )
}

export default SelectedFile
