import React, { useEffect, useState } from 'react';

import './style.css';
import Columns from 'react-columns';
import { Row, Col } from 'react-flexbox-grid';
import { TextInput, Button, Container } from 'nes-react';
import ClickArea from '../../components/ClickArea';

import fetchPokemons from './requests';

import { Link } from 'react-router-dom';

const PAGE_SIZE = 20;

const Home = ({history}) => {
	const [page, setPage] = useState(0);
	const [pokemons, setPokemons] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		async function loadPokemons() {
			setPokemons(await fetchPokemons(page));
		}

		loadPokemons();
	}, [page]);

	function renderPageButton(isPrevious) {
		const limit = Math.ceil(807 / PAGE_SIZE);
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

	const handleInput = (e) => setSearch(e.target.value);
		
	const handleSearch = () => history.push(`/pokemon/${search}`)

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
			Search for a pokémon:
			<Row>
				<Col lg={10}>
					<TextInput placeholder="Ex.: Magikarp" onChange={handleInput} />
				</Col>
				<Col lg={2}>
					<ClickArea onClick={handleSearch}>
						<Button>Search!</Button>
					</ClickArea>
				</Col>
			</Row>
			<div className="pokemons-container">
				<Columns queries={queries}>
					{pokemons.map((pokemon, index) => (
						<Link to={`/pokemon/${pokemon.id}`} className="link-pokemon">
							<Container centered title={pokemon.name} key={index} className="pokemon-card">
								<img src={pokemon.img_url} alt={`Imagem do ${pokemon.name}`} />
							</Container>
						</Link>
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
