const buscarPokemons = async (nextPage = "") => {
  const url = new URL(
    nextPage ? nextPage : "https://pokeapi.co/api/v2/pokemon"
  );
  if (!nextPage) {
    url.searchParams.set("limit", 10);
    url.searchParams.set("offset", 0);
  }
  const pokemonsPromise = await fetch(url);
  const pokemons = await pokemonsPromise.json();
  return pokemons;
};

const buscarPokemonsDetalhe = async (pokemonUrls = []) => {
  const pokemonFetch = pokemonUrls.map((pokemon) => fetch(pokemon.url));
  const pokemonsPromise = await Promise.all(pokemonFetch);
  const pokemons = await Promise.all(
    pokemonsPromise.map((pokemon) => pokemon.json())
  );
  return pokemons;
};

export { buscarPokemons, buscarPokemonsDetalhe };
