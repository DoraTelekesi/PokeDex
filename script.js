let BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=130"


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
  }
}

function getTypes(pokemonItems){
  typesHTML = "";
  for (let indexType = 0; indexType <pokemonItems.types.length; indexType++) {
    typesHTML += `<div class="types"><p class="${pokemonItems.types[indexType].type.name} icon"><img class="icon-img" src="./assets/icons/${pokemonItems.types[indexType].type.name}.svg"></p></div>` 
  }
  return typesHTML;
}

function pokeCardTemplate(pokemonItems){
    return `<div class="poke-card ${pokemonItems.types[0].type.name}">
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


function getStats(pokemonItems){
  let statsHTML = "";
  for (let i= 0; i < pokemonItems.stats.length; i++) {
    let percent= pokemonItems.stats[i].base_stat / 110;
    percent = Math.round(percent * 100)
    statsHTML += `<tr><td>${pokemonItems.stats[i].stat.name}</td><td>:</td><td><div class="progress-bar"><div class="progress-bar-filling" style="width:${percent}%"></div></div></td></tr>`;
  }
  return statsHTML;
}

async function showEvolutionChain(pokemonItems){
    //to fetch certain Pokemons` evolution chain
    let responseSpecies = await fetch(pokemonItems.species.url);
    let speciesList = await responseSpecies.json();
    let responseEvoChain = await fetch(speciesList.evolution_chain.url);
    let evoChain = await responseEvoChain.json();

    //to reach the first member of evolution chain
    let responseSpecies4 = await fetch(evoChain.chain.species.url)
    let species3 = await responseSpecies4.json();
    let varieties = await fetch(species3.varieties[0].pokemon.url);
    let varieties2 = await varieties.json();
    // show first member of evolution
    document.getElementById("evo-chain").innerHTML += `
    <div class="evo-imgs">
    <img class="evo-img" src="${varieties2.sprites.other["official-artwork"]["front_default"]}">
    <div class="evo-names">
    <p>${evoChain.chain.species.name}</p>
    </div>
    </div>`

    // if there are more than 3 member of evolution
    if (evoChain.chain.evolves_to.length > 1) {
      for (let i = 0; i < evoChain.chain.evolves_to.length; i++) {
          let responseTest = await fetch(evoChain.chain.evolves_to[i].species.url)
          let test = await responseTest.json();
          let responseTest2 = await fetch(test.varieties[0].pokemon.url);
          let test2 = await responseTest2.json();
          console.log(test2.sprites.other["official-artwork"]["front_default"])
          document.getElementById("evo-chain").style.overflowX = "scroll";
          document.getElementById("evo-chain").innerHTML += `<div class="separator">>></div>
          <div class="evo-imgs">
          <img class="evo-img" src="${test2.sprites.other["official-artwork"]["front_default"]}">
          <div class="evo-names">
          <p>${evoChain.chain.evolves_to[i].species.name}</p>
          </div> 
          </div> 
          `
      }
    }

    else {

      if (evoChain.chain.evolves_to.length !== 0) {
        //to reach the second member of evolution chain
        let responseSpecies2 = await fetch(evoChain.chain.evolves_to[0].species.url)
        let species = await responseSpecies2.json();
        let responseSpeciesVarieties = await fetch(species.varieties[0].pokemon.url);
        let speciesVarieties = await responseSpeciesVarieties.json();

 
      if (evoChain.chain.evolves_to[0].evolves_to.length !== 0) {
    	  // to reach the third member of evolution chain
        let responseSpecies3 = await fetch(evoChain.chain.evolves_to[0].evolves_to[0].species.url)
        let species2 = await responseSpecies3.json();
        let responseSpeciesVarieties2 = await fetch(species2.varieties[0].pokemon.url);
        let speciesVarieties2 = await responseSpeciesVarieties2.json();
        // document.getElementById("evo-chain").style.display = "flex";
        document.getElementById("evo-chain").innerHTML += `<div class="separator">>></div><div class="evo-imgs">
        <img class="evo-img" src="${speciesVarieties.sprites.other["official-artwork"]["front_default"]}">
        <div class="evo-names">
        <p>${evoChain.chain.evolves_to[0].species.name}</p>
        </div>
        </div>
        <div class="separator">>></div><div class="evo-imgs">
        <img class="evo-img" src="${speciesVarieties2.sprites.other["official-artwork"]["front_default"]}">
        <div class="evo-names"><p>${evoChain.chain.evolves_to[0].evolves_to[0].species.name}</p>
        </div> 
        </div>`
      }
      else {
        document.getElementById("evo-chain").innerHTML += `<div class="separator">>></div><div class="evo-imgs">
        <img class="evo-img" src="${speciesVarieties.sprites.other["official-artwork"]["front_default"]}">
        <div class="evo-names">
        <p>${evoChain.chain.evolves_to[0].species.name}</p>
        </div>
        </div>`
      }
      }
    }

}



function modalTemplate(pokemonItems) {
  return `<div class="modal-header">
            <h2>#${pokemonItems.id}</h2>
            <h2>${(pokemonItems.name).toUpperCase()}</h2>
          </div>
          <div class="modal-img-content ${pokemonItems.types[0].type.name}">
            <img class="modal-img"
            src="${pokemonItems.sprites.other["official-artwork"]["front_default"]}"
            alt="" />
          </div>
          <div class="modal-type">${getTypes(pokemonItems)}</div>
          <div class="modal-btns">
            <span id="main-btn" class="modal-btn" onclick="openMain()">Main</span>
            <span id="stats-btn" class="modal-btn" onclick="openStats()">Stats</span>
            <span id="evo-chain-btn" class="modal-btn" onclick="openEvoChain()">Evo Chain</span>
          </div>
          <div class="info-body">
            <table id="main" class="main main-dp-none">
              <tr><td>Height</td><td>:</td><td>${pokemonItems.height}</td></tr>
              <tr><td>Weight<td>:</td><td>${pokemonItems.weight}</td></tr>
              <tr><td>Base Experience<td>:</td> <td>${pokemonItems["base_experience"]}</td></tr>
              <tr><td>Abilities<td>:</td><td>${getAbilities(pokemonItems)}</td></tr>
            </table>
            <table id="stats" class="stats stats-dp-none">
            ${getStats(pokemonItems)}
          </table>
          <div id="evo-chain" class="evo-chain evo-dp-none">
          </div>
          </div>`;
}

function getAbilities(pokemonItems){
  abilitiesArr = [];
  for (let i =0; i < pokemonItems.abilities.length; i++) {
    abilitiesArr.push(pokemonItems.abilities[i].ability.name)
  }
  return abilitiesArr;
}

function openModal(pokemonItems){
  document.getElementById("modal-content").innerHTML = modalTemplate(pokemonItems);
  document.getElementById("modal-content").classList.remove("modal-closed");
  document.getElementById("overlay").classList.remove("overlay-dp-none");
  document.getElementById("main").classList.remove("main-dp-none");
  document.getElementById("main-btn").style = "border-bottom:2px solid rgb(219, 151, 25)";
  document.getElementById("stats").classList.add("stats-dp-none");
  document.getElementById("evo-chain").classList.add("evo-dp-none");
  showEvolutionChain(pokemonItems)
}

function closeModal(){
  document.getElementById("overlay").classList.add("overlay-dp-none");
  document.getElementById("modal-content").classList.add("modal-closed");
}

function openStats(){
  document.getElementById("main").classList.add("main-dp-none");
  document.getElementById("stats-btn").style = "border-bottom:2px solid rgb(219, 151, 25)";
  document.getElementById("main-btn").style = "";
  document.getElementById("stats").classList.remove("stats-dp-none");
  document.getElementById("evo-chain-btn").style = "";
  document.getElementById("evo-chain").classList.add("evo-dp-none");
  document.getElementById("evo-chain").style.display = "none";

}
function openMain(){
  document.getElementById("main").classList.remove("main-dp-none");
  document.getElementById("main-btn").style = "border-bottom:2px solid rgb(219, 151, 25)";
  document.getElementById("stats-btn").style = "";
  document.getElementById("stats").classList.add("stats-dp-none");
  document.getElementById("evo-chain-btn").style = "";
  document.getElementById("evo-chain").classList.add("evo-dp-none");
  document.getElementById("evo-chain").style.display = "none";
}

function openEvoChain(){
  document.getElementById("evo-chain").classList.remove("evo-dp-none");
  document.getElementById("stats").classList.add("stats-dp-none");
  document.getElementById("main").classList.add("main-dp-none");
  document.getElementById("evo-chain-btn").style = "border-bottom:2px solid rgb(219, 151, 25)";
  document.getElementById("stats-btn").style = "";
  document.getElementById("main-btn").style = "";
  document.getElementById("evo-chain").style.display = "flex";
}

