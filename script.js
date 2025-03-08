let BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"

let allPokemonItem = [];
let URLS = [];
let newUrls = [];
let limit = 10;
let offset = 0;

function init() {
  showLoadingSpinner();
  fetchPokemonList();
  disableLoadingSpinner();
  document.getElementById("search-field").innerHTML += searchFieldTemplate();
}

function loadMorePokemon(){
  limit = 20;  
  offset = offset + 20; 
  BASE_URL =  `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  showLoadingSpinner();
  fetchNewPokemon();
  disableLoadingSpinner();
  updateURLS();
}



function showLoadingSpinner(){
  document.getElementById("loading-screen").classList.remove("spinner-dp-none")
}

function disableLoadingSpinner(){
  document.getElementById("loading-screen").classList.add("spinner-dp-none")
}

async function fetchNewPokemon() {
  try {
    let response = await fetch(BASE_URL);
    let responseAsJson = await response.json();
    let myPokemonList = responseAsJson.results;
    getNewPokemonUrls(myPokemonList);
  } 
  catch (error) {
    console.error("not good");
  }
}

function getNewPokemonUrls(arr){
  newUrls = [];
  for (let indexUrl = 0; indexUrl < arr.length; indexUrl++) {
    newUrls.push(arr[indexUrl]);
  }
  showNewPokemon(newUrls);
}

function updateURLS(){
  URLS = URLS.concat(newUrls);
  return URLS;
}

async function showNewPokemon(arr) {
  for (let indexItem = 0; indexItem < arr.length; indexItem++) {
    let response = await fetch(arr[indexItem].url);
    let pokemonItems = await response.json();
    document.getElementById("main-content").innerHTML += pokemonCardTemplate(pokemonItems);
    allPokemonItem.push(pokemonItems);
  }
}


async function fetchPokemonList() {
    try {
      let response = await fetch(BASE_URL);
      let responseAsJson = await response.json();
      let myPokemonList= responseAsJson.results;
      getPokemonUrls(myPokemonList);
    } 
    catch (error) {
      console.error("not good");
    }
  }

function getPokemonUrls(arr){
  for (let indexUrl = 0; indexUrl < arr.length; indexUrl++) {
    URLS.push(arr[indexUrl]);
  }
  showAllPokemon(URLS)

}

async function showAllPokemon(arr) {
  allPokemonItem = [];
  document.getElementById("main-content").innerHTML ="";
  for (let indexItem= 0; indexItem < arr.length; indexItem++) {
    let response = await fetch(arr[indexItem].url);
    let pokemonItems = await response.json();
    document.getElementById("main-content").innerHTML += pokemonCardTemplate(pokemonItems);
    allPokemonItem.push(pokemonItems)
  }
}

function getTypes(pokemonItems){
  typesHTML = "";
  for (let indexType = 0; indexType <pokemonItems.types.length; indexType++) {
    typesHTML += `<div class="types"><p class="${pokemonItems.types[indexType].type.name} icon"><img class="icon-img" src="./assets/icons/${pokemonItems.types[indexType].type.name}.svg"></p></div>` 
  }
  return typesHTML;
}


