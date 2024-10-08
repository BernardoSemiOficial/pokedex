import { criarCardPokemon } from "./criarCardPokemon.js";
import { buscarPokemons, buscarPokemonsDetalhe } from "./fetchPokemon.js";
import { ativarCarregamento, formatarInfosPokemon } from "./utils.js";

window.addEventListener("load", () => {
  carregarAplicacao();
});

const pokemons = {
  nextPage: "",
  itens: [],
  carregando: false,
};
const inputSearch = document.querySelector("[data-search]");
const sentinela = document.getElementById("sentinela");

const carregarAplicacao = async () => {
  // Habilitar carregamento
  pokemons.carregando = true;
  ativarCarregamento(true);

  const dados = await buscarDados();

  // Desligar carregamento
  pokemons.carregando = false;
  ativarCarregamento(false);

  // Renderizar Pokemons
  criarCardPokemon(dados);

  // Pesquisar Pokemons
  const listaPokemonsChildren = Array.from(
    document.querySelector("[data-list-pokemons]").children
  );
  inputSearch.addEventListener("input", (evento) =>
    pesquisarPokemon(evento, listaPokemonsChildren)
  );

  observarSentinela();
};

const pesquisarPokemon = (evento, listaPokemonsChildren) => {
  const pokemonSearch = evento.target.value.toLowerCase();
  const resultadoSearch = listaPokemonsChildren.filter((pokemon) =>
    pokemon.dataset.pokemonName.includes(pokemonSearch)
  );

  listaPokemonsChildren.forEach((pokemon) =>
    pokemon.classList.add("pokemon__content__list__item--hide")
  );

  if (resultadoSearch.length > 0) {
    resultadoSearch.forEach((pokemon) =>
      pokemon.classList.remove("pokemon__content__list__item--hide")
    );
  }
};

const buscarDados = async (nextPage = "") => {
  const pokemonsUrlResponse = await buscarPokemons(nextPage);
  pokemons.nextPage = pokemonsUrlResponse.next;
  const pokemonsResponse = await buscarPokemonsDetalhe(
    pokemonsUrlResponse.results
  );
  const dados = formatarInfosPokemon(pokemonsResponse);
  pokemons.itens.push(dados);
  return dados;
};

const observarSentinela = () => {
  const observer = new IntersectionObserver(lidarComSentinela, {
    root: null,
    rootMargin: "0px", // Sem margem extra
    threshold: 1.0, // 100% visível
  });
  observer.observe(sentinela);
};

const lidarComSentinela = async (entries) => {
  const sentinela = entries.find((entry) => entry.target.id === "sentinela");
  if (sentinela.isIntersecting && !pokemons.carregando) {
    // Habilitar carregamento
    pokemons.carregando = true;
    ativarCarregamento(true);

    const dados = await buscarDados(pokemons.nextPage);

    // Desligar carregamento
    pokemons.carregando = false;
    ativarCarregamento(false);

    // Renderizar Pokemons
    criarCardPokemon(dados);
  }
};
