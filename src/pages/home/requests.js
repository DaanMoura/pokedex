import api from '../../services/api';

const PAGE_SIZE = 20;

export default async function fetchPokemon(page) {
    const pokemons = [];
    const begin = page * PAGE_SIZE + 1;
    for (let i = begin; i < begin + PAGE_SIZE; i++) {
        const response = await api.get(`/pokemon/${i}`);
        const data = response.data;
        pokemons.push({
            id: i,
            name: data['name'],
            img_url: data['sprites']['front_default'],
        });
    }
    
    return pokemons;
}