import "./App.css";
import Nav from "./components/Nav/Nav";
import Pokemons from "./components/Pokemons/Pokemons";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Nav />
            <Routes>
                <Route path="pokemons" element={<Pokemons />} />
            </Routes>
        </div>
    );
}

export default App;
