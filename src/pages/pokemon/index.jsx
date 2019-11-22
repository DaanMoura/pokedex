import React, { Component, useState, useEffect } from 'react';
import api from '../../services/api';

import { Container, Progress } from 'nes-react';
import { Row, Col } from 'react-flexbox-grid';

import './style.css';

const Pokemon = props => {
	const { id } = props.match.params;
	const [pokemon, setPokemon] = useState({ 
		id: 0, 
		name: '', 
		front_sprite: '',
		back_sprite: '',
		abilities: [{}], 
		types: [{}], 
		stats: {},
		flavor_text: '',
	 });

	useEffect(() => {
		async function loadPokemon() {
			const pokemon_response = await api.get(`/pokemon/${id}/`);
			const pokemon_data = pokemon_response.data;

			const types = pokemon_data['types'].map(type => type['type']);
			const abilities = pokemon_data['abilities'].map(ability => ability['ability']);
			const stats = {
				speed: pokemon_data['stats'][0]['base_stat'],
				special_defense: pokemon_data['stats'][1]['base_stat'],
				special_attack: pokemon_data['stats'][2]['base_stat'],
				defense: pokemon_data['stats'][3]['base_stat'],
				attack: pokemon_data['stats'][4]['base_stat'],
				hp: pokemon_data['stats'][5]['base_stat'],
			};

			const specie_response = await api.get(`/pokemon-species/${pokemon_data['species']['name']}/`);
			const specie_data = specie_response.data;

			let flavor_text;

			for(let i in specie_data['flavor_text_entries']) {
				const entrie = specie_data['flavor_text_entries'][i]
				if(entrie['language']['name'] == 'en') {
					flavor_text = entrie['flavor_text'];
					break;
				}
			}
			
			setPokemon({
				id: pokemon_data['id'],
				name: pokemon_data['name'],
				front_sprite: pokemon_data['sprites']['front_default'],
				back_sprite: pokemon_data['sprites']['back_default'],
				abilities,
				types,
				stats,
				flavor_text,
			});
		}

		loadPokemon();
	}, []);

	return (
		<>
			<h1>
				#{pokemon.id} {pokemon.name}
			</h1>
			<p>{pokemon.flavor_text}</p>
			<Row top='lg'>
				<Col lg={4} md={4} sm={12}>
					{ pokemon.front_sprite ? <img alt={`Front of ${pokemon.name}`} src={pokemon.front_sprite} className="pokemon-img" /> : <></> }
					{ pokemon.back_sprite ? <img alt={`Back of ${pokemon.name}`} src={pokemon.back_sprite} className="pokemon-img" /> : <></> }
                    <Container title="Types" className='poke-container'>
                        <ul>
                            {pokemon.types.map(type => <li>{type.name}</li>)}
                        </ul>
                    </Container>

                    <Container title="Abilities" className='poke-container'>
                        <ul>
                            {pokemon.abilities.map(ability => <li>{ability.name}</li>)}
                        </ul>
                    </Container>
				</Col>
				<Col lg={8} md={5} sm={12}>
					<Container title="Stats">
						HP {pokemon.stats.hp}
                        <Progress value={pokemon.stats.hp} max={255} success />
                        Attack {pokemon.stats.attack}
                        <Progress value={pokemon.stats.attack} max={190} error />
                        Defense {pokemon.stats.defense}
                        <Progress value={pokemon.stats.defense} max={230} warning />
                        Special Attack {pokemon.stats.special_attack}
                        <Progress value={pokemon.stats.special_attack} max={194} error />
                        Special Defense {pokemon.stats.special_defense}
                        <Progress value={pokemon.stats.special_defense} max={230} warning />
                        Speed {pokemon.stats.speed}
                        <Progress value={pokemon.stats.speed} max={180} primary />
					</Container>
				</Col>
			</Row>
			
		</>
	);
};

export default Pokemon;
