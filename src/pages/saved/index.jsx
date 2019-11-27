import React, { useEffect, useState } from 'react';

import '../../shared/style.css';
import PokemonsContainer from '../../components/PokemonsContainer';

const Saved = () => {
	const [pokemons, setPokemons] = useState([]);
	const [isEmpty, setIsEmpty] = useState(false);

	useEffect(() => {
        const savedPokemonsJson = localStorage.getItem('saved_list');
        if(!savedPokemonsJson) {
            setIsEmpty(true);
            return;
        }
        const savedPokemons = JSON.parse(savedPokemonsJson);
        if(savedPokemons.length < 1) {
            setIsEmpty(true);
            return;
        }
		const _pokemons = savedPokemons.map(pokemon => {
			const pokemonJson = localStorage.getItem(pokemon);
			return JSON.parse(pokemonJson);
		});
		setPokemons(_pokemons);
	}, []);

	return (
		<div>
			<h1>Your favorites pokémons</h1>
			{isEmpty ? (
				<p>
					Nothing to show here...
					<br />
					Use 'Favorite' button to save your favorites pokémons!
				</p>
			) : (
				<PokemonsContainer pokemons={pokemons} />
			)}
		</div>
	);
};

export default Saved;
