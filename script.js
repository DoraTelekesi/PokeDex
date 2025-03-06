let BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"


function init() {
  fetchPokemonList();
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

let URLS = [];
function getPokemonUrls(arr){
  for (let indexUrl = 0; indexUrl < arr.length; indexUrl++) {
    URLS.push(arr[indexUrl]);
  }
  showAllPokemon(URLS)
}

async function showAllPokemon(arr) {
  document.getElementById("main-content").innerHTML ="";
  for (let indexItem= 0; indexItem < arr.length; indexItem++) {
    let response = await fetch(arr[indexItem].url);
    let pokemonItems = await response.json();
    document.getElementById("main-content").innerHTML += pokemonCardTemplate(pokemonItems);
  }
}

function getTypes(pokemonItems){
  typesHTML = "";
  for (let indexType = 0; indexType <pokemonItems.types.length; indexType++) {
    typesHTML += `<div class="types"><p class="${pokemonItems.types[indexType].type.name} icon"><img class="icon-img" src="./assets/icons/${pokemonItems.types[indexType].type.name}.svg"></p></div>` 
  }
  return typesHTML;
}



