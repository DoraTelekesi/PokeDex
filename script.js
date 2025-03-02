let BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0"

async function fetchDataJson() {
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
    document.getElementById("main-content").innerHTML += pokeCardTemplate(pokemonItems);
    getBackgroundColorClass(pokemonItems);
  }
}

function getTypes(pokemonItems){
  typesHTML = "";
  for (let indexType = 0; indexType <pokemonItems.types.length; indexType++) {
    typesHTML += `<div class="types"><p class="${pokemonItems.types[indexType].type.name} icon"><img class="icon-img" src="./assets/icons/${pokemonItems.types[indexType].type.name}.svg"></p></div>` 
  }
  return typesHTML;
}


function getBackgroundColorClass(pokemonItems){
  let className = `${pokemonItems.types[0].type.name}`;
  return className;
}

  function pokeCardTemplate(pokemonItems){
    return `<div class="poke-card ${getBackgroundColorClass(pokemonItems)}">
            <div class="poke-card-header">
              <p id="poke-nr">${pokemonItems.id}#</p>
              <p id="poke-name">${pokemonItems.name}</p>
            </div>
            <div class="image-content">
              <img class="poke-img" id="poke-img" src="${pokemonItems.sprites.other["official-artwork"]["front_default"]}" alt="Pokemon-Image" />
            </div>
            <div class="poke-card-footer">
              ${getTypes(pokemonItems)}
            </div>
          </div>`
  }

  // let typesWithColors = [
  //   {"type": "bug","color": "#92BC2C"},
  //   {"type": "dark", "color": "#595761"},
  //   {"type": "dragon", "color": "#0C69C8"},
  //   {"type": "electric", "color": "#F2D94E"},
  //   {"type": "fire", "color": "#FBA54C"},
  //   {"type": "fairy", "color": "#EE90E6"},
  //   {"type": "fighting", "color": "#D3425F"},
  //   {"type": "flying", "color": "#A1BBEC"},
  //   {"type": "ghost", "color": "#5F6DBC"},
  //   {"type": "grass", "color": "#5FBD58"},
  //   {"type": "ground", "color": "#DA7C4D"},
  //   {"type": "normal", "color": "#A0A29F"},
  //   {"type": "poison", "color": "#B763CF"},
  //   {"type": "psychic", "color": "#FA8581"},
  //   {"type": "rock", "color": "#C9BB8A"},
  //   {"type": "steel", "color": "#5695A3"},
  //   {"type": "water", "color": "#539DDF"}
  // ]