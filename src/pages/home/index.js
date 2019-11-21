import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { TextInput, Button } from 'nes-react';
import ClickArea from '../../components/ClickArea';

const PAGE_SIZE = 20;


const Home = () => {
    const [page, setPage] = useState(0);
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        async function loadPokemons() {
            const temp = [];
            const begin = page * PAGE_SIZE + 1
            for (let i = begin; i < begin + PAGE_SIZE; i++) {
                const response = await api.get(`/pokemon/${i}`);
                const data = response.data;
                temp.push({
                    id: i,
                    name: data['name'],
                })
            }

            setPokemons(temp);
        }

        loadPokemons();
    }, [page]);

    function renderPageButton(isPrevious) {
        const limit = Math.ceil(964 / PAGE_SIZE);
        if (isPrevious) {
            return page == 0 ? <></> : <ClickArea onClick={() => setPage(page - 1)}>
                <Button> {'<'} </Button>
            </ClickArea>
        } else return page == limit ? <></> : <ClickArea onClick={() => setPage(page + 1)}>
            <Button> {'>'} </Button>
        </ClickArea>
    }

    return (
        <>
            <TextInput
                label="Search a pokémon:"
                placeholder="Ex.: Magikarp"
            />
            <ul>
                {pokemons.map((pokemon, index) => <li key={index}>{pokemon.name} - {pokemon.id}</li>)}
            </ul>

            <div className="row">
                {renderPageButton(true)}
                {page + 1}
                {renderPageButton(false)}
            </div>
        </>
    )
};




export default Home

