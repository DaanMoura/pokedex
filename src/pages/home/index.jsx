import React, { useEffect, useState } from 'react';

import './style.css';
import '../../shared/style.css';
import Columns from 'react-columns';
import { Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import { TextInput, Button, Container } from 'nes-react';

import ClickArea from '../../components/ClickArea';
import { fetchPokemons, fetchTypePokemons } from './requests';
import { pokemonsQueries, filterQueries } from '../../shared/columnsQueries';
import FilterButton from './FilterButton';

const PAGE_SIZE = 20;

const Home = ({ history, match }) => {
	const [page, setPage] = useState(0);
	const [pokemons, setPokemons] = useState([]);
	const [search, setSearch] = useState('');
	const [filterOpen, setFilterOpen] = useState(false);

	const { type } = match.params;

	const typeList = [
		'normal',
		'fire',
		'water',
		'electric',
		'grass',
		'ice',
		'fighting',
		'poison',
		'ground',
		'flying',
		'psychic',
		'bug',
		'rock',
		'ghost',
		'dragon',
		'dark',
		'steel',
		'fairy',
	];

	useEffect(() => {
		async function loadPokemons() {
			console.log(type);

			if (type) {
				setPokemons(await fetchTypePokemons(type, page));
			} else {
				setPokemons(await fetchPokemons(page));
			}
		}

		loadPokemons();
	}, [page]);

	function changePage(p) {
		setPokemons([]);
		setPage(p);
	}

	function renderPageButton(isPrevious) {
		const limit = Math.ceil(807 / PAGE_SIZE);
		if (isPrevious) {
			return page === 0 ? (
				<></>
			) : (
				<ClickArea onClick={() => changePage(page - 1)}>
					<Button> {'<'} </Button>
				</ClickArea>
			);
		} else
			return page === limit ? (
				<></>
			) : (
				<ClickArea onClick={() => changePage(page + 1)}>
					<Button> {'>'} </Button>
				</ClickArea>
			);
	}

	const handleInput = e => setSearch(e.target.value);
	const handleSearch = () => history.push(`/pokemon/${search}`);
	const handleSaved = () => history.push(`/saved/`);
	const openFilters = () => setFilterOpen(!filterOpen);

	return (
		<>
			<Row>
				<Col lg={5}>
					<TextInput placeholder="Search for a pokémon" onChange={handleInput} />
				</Col>
				<Col lg={2}>
					<ClickArea onClick={handleSearch}>
						<Button>Search!</Button>
					</ClickArea>
				</Col>
				<Col lg={1} />
				<Col lg={2}>
					<ClickArea onClick={openFilters}>
						<Button>Filter</Button>
					</ClickArea>
				</Col>
				<Col lg={2}>
					<ClickArea onClick={handleSaved}>
						<Button>Saved</Button>
					</ClickArea>
				</Col>
			</Row>

			{filterOpen ? (
				<Container title="Select a type">
					<Columns queries={filterQueries}>
						{typeList.map(type => (
							<FilterButton filter={type} />
						))}
					</Columns>
				</Container>
			) : (
				<></>
			)}

			<div className="subtitle">
				{type ? (
					<h2>
						Showing <b>{type}</b> pokemons
					</h2>
				) : (
					<h2>
						Showing <b>all</b> pokemons
					</h2>
				)}
			</div>

			{pokemons.length > 0 ? (
				<div className="pokemons-container">
					<Columns queries={pokemonsQueries}>
						{pokemons.map((pokemon, index) => (
							<Link to={`/pokemon/${pokemon.name}`} className="link-pokemon">
								<Container centered title={pokemon.name} key={index} className="pokemon-card">
									<img src={pokemon.img_url} alt={`Imagem do ${pokemon.name}`} />
								</Container>
							</Link>
						))}
					</Columns>
				</div>
			) : (
				<h2>Loading...</h2>
			)}
			<div className="row">
				{renderPageButton(true)}
				{page + 1}
				{renderPageButton(false)}
			</div>
		</>
	);
};

export default Home;
