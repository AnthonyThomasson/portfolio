import Editor from "./components/editor/Editor";
import Footer from './components/footer/Footer';
import SideBar from "./components/side-bar/SideBar";
import "./styles/App.css";
import "./styles/ModuleIcons.css";

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
