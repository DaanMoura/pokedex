import React, {useEffect,useState} from 'react'

import '../../shared/style.css';
import PokemonsContainer from '../../components/PokemonsContainer';

const Saved = () => {
    const [pokemons,setPokemons] = useState([]);

    useEffect(() => {
        const savedPokemonsJson = localStorage.getItem('saved_list');
        const savedPokemons = JSON.parse(savedPokemonsJson);
        const _pokemons = savedPokemons.map(pokemon => {
            const pokemonJson = localStorage.getItem(pokemon);
            return JSON.parse(pokemonJson);
        });
        setPokemons(_pokemons);
    }, []);

    return (
        <div>
            <h1>Your favorites pokémons</h1>
            <PokemonsContainer pokemons={pokemons}/>
        </div>
    )
}

export default Saved;
