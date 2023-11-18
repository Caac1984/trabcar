import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Inicio from './pages/Inicio';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';

import './index.css';

import Container from "./layout/Container";


function App() {
    return (
        <Router>
            <div>
                <Link to="/">Inicio</Link>
                <Link to="/sobre">Sobre</Link>
                <Link to="/contato">Contato</Link>
            </div>
        
            <Routes>
                    <Container customClass="min-height">
                        <Route  path="/" element={<Inicio />}/>
                        <Route  path="/sobre"element={<Sobre />}/>
                        <Route  path="/contato"element={<Contato />}/>
                        <p>Footer</p>
                    </Container>
            </Routes>
        </Router>

    );
}

export default App;