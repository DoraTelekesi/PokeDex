let BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"

async function fetchDataJson() {
    try {
      let response = await fetch(BASE_URL);
      let responseAsJson = await response.json();
      let myPokemonList= responseAsJson.results;
      // console.log(myPokemonList)
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
              <img class="poke-img" id="poke-img" onclick='openModal(${JSON.stringify(pokemonItems)})' src="${pokemonItems.sprites.other["official-artwork"]["front_default"]}" alt="Pokemon-Image" />
            </div>
            <div class="poke-card-footer">
              ${getTypes(pokemonItems)}
            </div>
          </div>`
}

function openModal(pokemonItems){
  document.getElementById("modal-content").innerHTML = modalTemplate(pokemonItems);
  document.getElementById("modal-content").classList.remove("modal-closed");
  document.getElementById("overlay").classList.remove("overlay-dp-none");
}

function closeModal(){
  document.getElementById("overlay").classList.add("overlay-dp-none");
  document.getElementById("modal-content").classList.add("modal-closed");
}


function modalTemplate(pokemonItems) {
  return `<div class="modal-header">
            <h2>#${pokemonItems.id}</h2>
            <h2>${(pokemonItems.name).toUpperCase()}</h2>
          </div>
          <div class="modal-img-content ${getBackgroundColorClass(pokemonItems)}">
            <img class="modal-img"
            src="${pokemonItems.sprites.other["official-artwork"]["front_default"]}"
            alt="" />
          </div>
          <div class="modal-type">${getTypes(pokemonItems)}</div>
          <div class="modal-btns">
            <span class="modal-btn">Main</span>
            <span class="modal-btn">Stats</span>
            <span class="modal-btn">Evo Chain</span>
          </div>
          <div class="info-body">
            <table id="main" class="main main-dp-none">
              <tr><td>Height</td><td>:</td><td>${pokemonItems.height}</td></tr>
              <tr><td>Weight<td>:</td><td>${pokemonItems.weight}</td></tr>
              <tr><td>Base Experience<td>:</td> <td>${pokemonItems["base_experience"]}</td></tr>
              <tr><td>Abilities<td>:</td><td>${getAbilities(pokemonItems)}</td></tr>
            </table>
          </div>`}

function getAbilities(pokemonItems){
  abilitiesArr = [];
  for (let i =0; i < pokemonItems.abilities.length; i++) {
    abilitiesArr.push(pokemonItems.abilities[i].ability.name)
  }
  return abilitiesArr;
}