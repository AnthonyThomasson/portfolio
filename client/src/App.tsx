import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Main from './components/Main'
import './styles/App.css'
import './styles/ModuleIcons.css'

function App(): JSX.Element {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/file/:fileId" element={<Main />} />
                    <Route path="*" element={<Main unknownPath />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    )
}

export default App
