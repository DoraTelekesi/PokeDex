let BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

let allPokemonItems = [];
let currentPokemonList = [];
let URLS = [];
let newUrls = [];
let offset = 0;

function init() {
  showLoadingSpinner();
  disableLoadButton();
  fetchPokemonList();
  disableLoadingSpinner();
  enableLoadButton();

  document.getElementById("search-field").innerHTML += searchFieldTemplate();
}

async function fetchPokemonList() {
  try {
    let response = await fetch(BASE_URL);
    let responseAsJson = await response.json();
    let pokemonList = responseAsJson.results;
    getPokemonUrls(pokemonList);
  } catch (error) {
    console.error("Response Failed");
  }
}

function getPokemonUrls(pokemonList) {
  for (let indexUrl = 0; indexUrl < pokemonList.length; indexUrl++) {
    URLS.push(pokemonList[indexUrl]);
  }
  fetchAllPokemon(URLS);
}

async function fetchAllPokemon(pokemonList) {
  allPokemonItems = [];
  for (let indexItem = 0; indexItem < pokemonList.length; indexItem++) {
    let response = await fetch(pokemonList[indexItem].url);
    let pokemonItems = await response.json();
    allPokemonItems.push(pokemonItems);
  }
  renderPokemons(allPokemonItems);
}

function renderPokemons(pokemonList) {
  document.getElementById("main-content").innerHTML = "";
  for (
    let indexPokemon = 0;
    indexPokemon < pokemonList.length;
    indexPokemon++
  ) {
    document.getElementById("main-content").innerHTML +=
      pokemonCardTemplate(indexPokemon);
  }
}

async function loadMorePokemon() {
  offset += 20;
  BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`;
  showLoadingSpinner();
  disableLoadButton();
  await fetchNewPokemonList();
  disableLoadingSpinner();
  enableLoadButton();
}

async function fetchNewPokemonList() {
  try {
    let response = await fetch(BASE_URL);
    let responseAsJson = await response.json();
    let pokemonList = responseAsJson.results;
    getNewPokemonUrls(pokemonList);
  } catch (error) {
    console.error("Response Failed");
  }
}

function getNewPokemonUrls(newPokemonList) {
  newUrls = [];
  for (let indexUrl = 0; indexUrl < newPokemonList.length; indexUrl++) {
    newUrls.push(newPokemonList[indexUrl]);
  }
  fetchNewPokemons(newUrls);
}

async function fetchNewPokemons(newPokemonList) {
  for (let indexItem = 0; indexItem < newPokemonList.length; indexItem++) {
    let response = await fetch(newPokemonList[indexItem].url);
    let pokemonItems = await response.json();
    allPokemonItems.push(pokemonItems);
  }
  renderNewPokemons(newUrls.length);
}

function renderNewPokemons(newCount) {
  let startIndex = allPokemonItems.length - newCount;
  for (
    let indexNewPokemon = startIndex;
    indexNewPokemon < allPokemonItems.length;
    indexNewPokemon++
  ) {
    document.getElementById("main-content").innerHTML +=
      pokemonCardTemplate(indexNewPokemon);
  }
}

function getTypes(i) {
  let typesHTML = "";
  for (
    let indexType = 0;
    indexType < allPokemonItems[i].types.length;
    indexType++
  ) {
    typesHTML += `<div class="types"><p class="${allPokemonItems[i].types[indexType].type.name} icon"><img class="icon-img" src="./assets/icons/${allPokemonItems[i].types[indexType].type.name}.svg"></p></div>`;
  }
  return typesHTML;
}

function showLoadingSpinner() {
  document.getElementById("loading-screen").classList.remove("spinner-dp-none");
}

function disableLoadingSpinner() {
  document.getElementById("loading-screen").classList.add("spinner-dp-none");
}

function disableLoadButton() {
  document
    .getElementById("more-pokemon")
    .classList.add("load-more-pokemon-dp-none");
}
function enableLoadButton() {
  document
    .getElementById("more-pokemon")
    .classList.remove("load-more-pokemon-dp-none");
}
