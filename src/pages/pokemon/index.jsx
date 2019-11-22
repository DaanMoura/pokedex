import React, { Component, useState, useEffect } from 'react';
import api from '../../services/api';

import { Container, Progress } from 'nes-react';
import { Row, Col } from 'react-flexbox-grid';

import './style.css';

const Pokemon = props => {
	const { id } = props.match.params;
	const [pokemon, setPokemon] = useState({ id: 0, name: '', img_url: '', abilities: [{}], types: [{}], stats: {} });

	useEffect(() => {
		async function loadPokemon() {
			const response = await api.get(`/pokemon/${id}/`);
			const data = response.data;

			const _types = data['types'].map(type => type['type']);
			const _abilities = data['abilities'].map(ability => ability['ability']);
			const _stats = {
				speed: data['stats'][0]['base_stat'],
				special_defense: data['stats'][1]['base_stat'],
				special_attack: data['stats'][2]['base_stat'],
				defense: data['stats'][3]['base_stat'],
				attack: data['stats'][4]['base_stat'],
				hp: data['stats'][5]['base_stat'],
			};

			setPokemon({
				id: data['id'],
				name: data['name'],
				img_url: data['sprites']['front_default'],
				abilities: _abilities,
				types: _types,
				stats: _stats,
			});
		}

		loadPokemon();
	}, []);

	return (
		<>
			<h1>
				#{pokemon.id} {pokemon.name}
			</h1>
			<Row top='lg'>
				<Col lg={4} md={4} sm={12}>
					<img alt={`Imagem do ${pokemon.name}`} src={pokemon.img_url} className="pokemon-img" />
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
