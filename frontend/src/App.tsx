import "./App.css";
import Editor from "./editor/Editor";
import Footer from './footer/Footer';
import SideBar from './side-bar/SideBar';

function App() {
  return (
    <div className="app">
      <div className="main">
        <SideBar />
        <Editor />
      </div>
      <Footer />
    </div>
  );
}

export default App;
