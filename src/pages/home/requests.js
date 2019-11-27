import api from '../../services/api';

const PAGE_SIZE = 20;

async function fetchPokemonSearch(search, page) {
    const response = await api.get('/pokemon', {
        params: { offset: 0, limit: 964, },
    });
    const results = response.data.results;
    const searchResults = results.filter((result) => result.name.includes(search.toLowerCase()));

    console.log(searchResults);

    if (searchResults.length === 0)
        return {
            size: 0,
            pokemons: 0,
        };

    const pokemons = [];
    const begin = page * PAGE_SIZE;
    for (let i = begin; i < (begin + PAGE_SIZE) && i < searchResults.length; i++) {
        console.log(searchResults[i], i);
        const pokemonResponse = await api.get(searchResults[i].url);
        const pokemonData = pokemonResponse.data;
        pokemons.push({
            id: pokemonData.id,
            name: pokemonData.name,
            img_url: pokemonData.sprites.front_default,
        });
    }

    return {
        size: searchResults.length,
        pokemons,
    };
}

async function fetchTypePokemonList(type) {
    const response = await api.get(`/type/${type}`);
    const pokemonsData = response.data['pokemon'];

    const pokemonList = pokemonsData.map((item) => item['pokemon']['name']);

    return pokemonList;
}

async function fetchTypePokemons(type, page) {
    const pokemonList = await fetchTypePokemonList(type);
    const pokemons = [];
    const begin = page * PAGE_SIZE + 1;
    for (let i = begin; i < begin + PAGE_SIZE; i++) {
        const response = await api.get(`/pokemon/${pokemonList[i]}`);
        const data = response.data;
        pokemons.push({
            id: i,
            name: data['name'],
            img_url: data['sprites']['front_default'],
        });
    }


    return {
        size: pokemonList.length,
        pokemons,
    };
}

async function fetchPokemons(page) {
    const pokemons = [];
    const begin = page * PAGE_SIZE + 1;
    for (let i = begin; i < begin + PAGE_SIZE; i++) {
        const response = await api.get(`/pokemon/${i}`);
        const data = response.data;
        pokemons.push({
            id: data['id'],
            name: data['name'],
            img_url: data['sprites']['front_default'],
        });
    }

    return pokemons;
}

export { fetchTypePokemons, fetchPokemons, fetchPokemonSearch };