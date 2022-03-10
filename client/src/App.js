import "./App.css";
import Pokemons from "./components/Pokemons/Pokemons";
import Home from "./components/Home/Home";
import DetailPokemon from "./components/DetailPokemon/DetailPokemon";
import { Route, Routes } from "react-router-dom";
import PostPokemon from "./components/PostPokemon/PostPokemon";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/home" element={<Pokemons />} />
                <Route path="/pokemon/:id" element={<DetailPokemon />} />
                <Route path="/create" element={<PostPokemon />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;
