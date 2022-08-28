import DOMPurifier from 'dompurify'
import { marked } from 'marked'
import { IFileNode } from '../../utilities/files/api'

function SelectedFile(props: { file: IFileNode }) {
  const contentHTML = DOMPurifier.sanitize(marked.parse(props.file.content))

  return (
    <div className="selected-file">
      <div
        dangerouslySetInnerHTML={{
          __html: contentHTML
        }}></div>
    </div>
  )
}

export default SelectedFile
