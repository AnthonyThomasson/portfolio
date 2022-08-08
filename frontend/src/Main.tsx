import Editor from "./components/editor/Editor";
import SideBar from "./components/side-bar/SideBar";

function App(props:{unknownPath?:boolean}) {
  return (
	<div className="main">
		<SideBar />
		{props.unknownPath === true ? <Editor unknownPath />  : <Editor />}
	</div>
  );
}

export default App;
