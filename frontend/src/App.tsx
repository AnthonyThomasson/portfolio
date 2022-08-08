import Footer from './components/footer/Footer';
import SideBar from "./components/side-bar/SideBar";
import "./styles/App.css";
import "./styles/ModuleIcons.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Editor from './components/editor/Editor';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="main">
          <SideBar />
          <Routes>
            <Route path="/" element={<Editor />} />
            <Route path="file/:fileId" element={<Editor />} />
            <Route path="*" element={<Editor unknownPath/>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
