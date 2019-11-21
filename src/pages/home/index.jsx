import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import './Home.css';
import Columns from 'react-columns';
import { TextInput, Button, Container } from 'nes-react';
import ClickArea from '../../components/ClickArea';

const PAGE_SIZE = 20;

const Home = () => {
	const [page, setPage] = useState(0);
	const [pokemons, setPokemons] = useState([]);

	useEffect(() => {
		async function loadPokemons() {
			const temp = [];
			const begin = page * PAGE_SIZE + 1;
			for (let i = begin; i < begin + PAGE_SIZE; i++) {
				const response = await api.get(`/pokemon/${i}`);
				const data = response.data;
				temp.push({
					id: i,
					name: data['name'],
					img_url: data['sprites']['front_default'],
				});
			}

			setPokemons(temp);
		}

		loadPokemons();
	}, [page]);

	function renderPageButton(isPrevious) {
		const limit = Math.ceil(964 / PAGE_SIZE);
		if (isPrevious) {
			return page === 0 ? (
				<></>
			) : (
				<ClickArea onClick={() => setPage(page - 1)}>
					<Button> {'<'} </Button>
				</ClickArea>
			);
		} else
			return page === limit ? (
				<></>
			) : (
				<ClickArea onClick={() => setPage(page + 1)}>
					<Button> {'>'} </Button>
				</ClickArea>
			);
	}

	const queries = [
		{
			columns: 2,
			query: 'min-width: 512px',
		},
		{
			columns: 3,
			query: 'min-width: 768px',
		},
		{
			columns: 4,
			query: 'min-width: 1024px',
		},
	];

	return (
		<>
			<TextInput label="Search a pokémon:" placeholder="Ex.: Magikarp" />

			<div className="pokemons-container">
				<Columns queries={queries}>
					{pokemons.map((pokemon, index) => (
						<Container centered title={pokemon.name} key={index} className="pokemon-card">
							<img src={pokemon.img_url} alt={`Imagem do ${pokemon.name}`} />
						</Container>
					))}
				</Columns>
			</div>

			<div className="row">
				{renderPageButton(true)}
				{page + 1}
				{renderPageButton(false)}
			</div>
		</>
	);
};

export default Home;
