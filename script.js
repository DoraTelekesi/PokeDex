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

// we fetch the base URL, which contains the first 20 Pokemons, an Array with 20 items - one item contains the name, and the relevant Pokemon URL
async function fetchPokemonList() {
  try {
    let response = await fetch(BASE_URL);
    let responseAsJson = await response.json();
    let pokemonList = responseAsJson.results;
    getPokemonUrls(pokemonList);

  } 
  catch (error) {
    console.error("Response Failed");
  }
}
// we iterate through the Array, and we create another Array - in global, see above - , we put only the URLS into this Array
function getPokemonUrls(pokemonList){
  for (let indexUrl = 0; indexUrl < pokemonList.length; indexUrl++) {
    URLS.push(pokemonList[indexUrl]);
  }
  fetchAllPokemon(URLS);
}

//we fetch all our URLS from the Array URLS, we created a global empty array "allPokemonItems", we push all pokemonItems here - which will contain all our Pokemons
//"allPokemonItems" is an array with Objects, that contains the subinformation from each Pokemon
async function fetchAllPokemon(pokemonList) {
  allPokemonItems = [];
  for (let indexItem = 0; indexItem < pokemonList.length; indexItem++) {
    let response = await fetch(pokemonList[indexItem].url);
    let pokemonItems = await response.json();
    allPokemonItems.push(pokemonItems);
  }
  renderPokemons(allPokemonItems);

}
//we iterate through allPokemonItems - and render them each into the DOM, with the given template
function renderPokemons(pokemonList){
  document.getElementById("main-content").innerHTML = "";
  for (let indexPokemon = 0; indexPokemon < pokemonList.length; indexPokemon++){
    document.getElementById("main-content").innerHTML += pokemonCardTemplate(indexPokemon);
  }
}

//click on the "load more pokemon" button, we add always 20 more to the offset, the limit is 20, so always 20 more Pokemon will be rendered, but nor from the first one, but from the last one
async function loadMorePokemon() {
  offset += 20; 
  BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`;
  //until all load, we show the loading Spinner, and we disable the "load more Pokemon" button
  showLoadingSpinner();
  disableLoadButton();
  //when all loaded, we disable the loading spinner, and enable out "load-more" button
  await fetchNewPokemonList();
  disableLoadingSpinner();
  enableLoadButton();
}

// based on the new BASE_URL - which we changed in loadMorePokemon function - we need to fetch these new PokemonList
async function fetchNewPokemonList() {
  try {
    let response = await fetch(BASE_URL);
    let responseAsJson = await response.json();
    let pokemonList = responseAsJson.results;
    getNewPokemonUrls(pokemonList);
  } 
  catch (error) {
    console.error("Response Failed");
  }
}
// we iterate through the Array, and we create another Array - in global, see above - , we put only the URLS into this Array - this time it will be newUrls
function getNewPokemonUrls(newPokemonList){
  newUrls = [];
  for (let indexUrl = 0; indexUrl < newPokemonList.length; indexUrl++) {
    newUrls.push(newPokemonList[indexUrl]);
  }
  fetchNewPokemons(newUrls);
}

// we need to fetch the new PokemonItems, and at the same time, we push to our original Array (allPokemonItems), so all our Pokemons are in one Array
async function fetchNewPokemons(newPokemonList) {
  for (let indexItem = 0; indexItem < newPokemonList.length; indexItem++) {
    let response = await fetch(newPokemonList[indexItem].url);
    let pokemonItems = await response.json();
    allPokemonItems.push(pokemonItems);
  }
  renderNewPokemons(newUrls.length); // we need the amount, how many new Pokemons/Urls we have
}

// 
function renderNewPokemons(newCount) {
  // 
  let startIndex = allPokemonItems.length - newCount;
  console.log(allPokemonItems.length)
  console.log(startIndex) // startIndex at first will be 20 (40-20), because onload we rendered Pokemons from index 0 to 19
  console.log(newCount) // newCount at first is 20, because we want to render 20 more Pokemon
  // so we iterate from nr 20, until it reaches our max amount of Pokemons (40), it should create a new template for it
  for (let indexNewPokemon = startIndex; indexNewPokemon < allPokemonItems.length; indexNewPokemon++){
    document.getElementById("main-content").innerHTML += pokemonCardTemplate(indexNewPokemon);
  }
}

//to get the types of one Pokemon, inside one pokemonItem we should reach "types", which is an array, usually contains 2 or 3 types
// to get the appropriate background color and icon for that, we have name the class and also the icon the same, as our type
function getTypes(i){
  let typesHTML = "";
  for (let indexType = 0; indexType < allPokemonItems[i].types.length; indexType++) {
    typesHTML += `<div class="types"><p class="${allPokemonItems[i].types[indexType].type.name} icon"><img class="icon-img" src="./assets/icons/${allPokemonItems[i].types[indexType].type.name}.svg"></p></div>`; 
  }
  return typesHTML;
}

function showLoadingSpinner(){
  document.getElementById("loading-screen").classList.remove("spinner-dp-none");
}

function disableLoadingSpinner(){
  document.getElementById("loading-screen").classList.add("spinner-dp-none");
}

function disableLoadButton(){
  document.getElementById("more-pokemon").classList.add("load-more-pokemon-dp-none")
}
function enableLoadButton(){
  document.getElementById("more-pokemon").classList.remove("load-more-pokemon-dp-none")
}