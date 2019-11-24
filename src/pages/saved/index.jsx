import React, {useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import Columns from 'react-columns';
import { Container } from 'nes-react';

import '../../shared/style.css';
import { pokemonsQueries } from '../../shared/columnsQueries';

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
            {pokemons.length > 0 ? (
				<div className="pokemons-container">
					<Columns queries={pokemonsQueries}>
						{pokemons.map((pokemon, index) => (
							<Link to={`/pokemon/${pokemon.name}`} className="link-pokemon">
								<Container centered title={pokemon.name} key={index} className="pokemon-card">
									<img src={pokemon.front_sprite} alt={`Front of ${pokemon.name}`} />
								</Container>
							</Link>
						))}
					</Columns>
				</div>
			) : (
				<h2>Loading...</h2>
			)}
        </div>
    )
}

export default Saved;
