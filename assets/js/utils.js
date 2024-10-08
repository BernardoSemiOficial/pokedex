const formatarInfosPokemon = (pokemon = []) => {
  return pokemon.map((pokemon) => {
    return {
      id: pokemon.id,
      nome: pokemon.name,
      tipo: typePokemon(pokemon.types),
      imagem: pokemon.sprites.other["official-artwork"].front_default,
    };
  });
};

const typePokemon = (arrayType) => {
  const type = [];
  arrayType.forEach((array) => type.push(array.type.name));
  return type.join(", ");
};

const ativarCarregamento = (option = false) => {
  const loader = document.querySelector("[data-loader]");
  option ? loader.removeAttribute("hidden") : loader.setAttribute("hidden", "");
};

export { ativarCarregamento, formatarInfosPokemon };
