const fetchPokemon = async () => {
  let url = new URL("https://pokeapi.co/api/v2/pokemon");
  url.searchParams.set("limit", 10);
  url.searchParams.set("offset", 0);
  const pokemonsPromise = await fetch(url);
  const pokemons = await pokemonsPromise.json();
  return pokemons;
};

export { fetchPokemon };
