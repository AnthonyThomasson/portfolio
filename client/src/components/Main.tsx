import Editor from './editor/Editor'
import SideBar from './side-bar/SideBar'

function App(props: { unknownPath?: boolean }): JSX.Element {
    return (
        <div className="main">
            <SideBar />
            {props.unknownPath === true ? <Editor unknownPath /> : <Editor />}
        </div>
    )
}

export default App
