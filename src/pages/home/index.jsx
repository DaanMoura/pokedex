import React, { useEffect, useState } from 'react';

import './style.css';
import '../../shared/style.css';
import Columns from 'react-columns';
import { Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import { TextInput, Button, Container, Checkbox } from 'nes-react';

import ClickArea from '../../components/ClickArea';
import { fetchPokemons, fetchTypePokemons, fetchPokemonSearch } from './requests';
import { pokemonsQueries, filterQueries } from '../../shared/columnsQueries';
import FilterButton from './FilterButton';

const PAGE_SIZE = 20;

const Home = ({ history, match }) => {
	const [page, setPage] = useState(0);
	const [pokemons, setPokemons] = useState([]);
	const [searchInput, setSearchInput] = useState('');
	const [filterOpen, setFilterOpen] = useState(false);
	const [strictSearch, setStrictSearch] = useState(false);

	const { type, search } = match.params;

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
			if (type) {
				setPokemons(await fetchTypePokemons(type, page));
			} else if (search) {
				setPokemons(await fetchPokemonSearch(search, page));
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

	const handleInput = e => setSearchInput(e.target.value);
	const handleSaved = () => history.push(`/saved/`);
	const openFilters = () => setFilterOpen(!filterOpen);

	return (
		<>
			<Row>
				<Col lg={5}>
					<TextInput placeholder="Search for a pokémon" onChange={handleInput} />
				</Col>
				<Col lg={2}>
					<a href={ strictSearch ? `/pokemon/${searchInput}` : `/search/${searchInput}` }>
						<Button>Search!</Button>
					</a>
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

			<Checkbox checked={strictSearch}
				label='Strict search'
				onSelect={() => setStrictSearch(!strictSearch)}
			/>

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
				) : search ? (
					<h2>
						Showing results for <b>"{search}"</b>
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
									{ pokemon.img_url ? <img src={pokemon.img_url} alt={`Front of ${pokemon.name}`} /> : <p>no picture</p>}
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
