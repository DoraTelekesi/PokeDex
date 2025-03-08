function pokemonCardTemplate(pokemonItems){
  console.log(pokemonItems)
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

function modalTemplate(pokemonItems) {
  return `<div class="modal-header">
            <h2>#${pokemonItems.id}</h2>
            <h2>${(pokemonItems.name).toUpperCase()}</h2>
          </div>
          <div class="modal-img-content ${pokemonItems.types[0].type.name}">
          <img class="previous-modal switch" id="previous-modal" onclick='previousModal(${JSON.stringify(pokemonItems)})' src="./assets/icons/angles-left-solid.svg" alt="">
            <img class="modal-img"
            src="${pokemonItems.sprites.other["official-artwork"]["front_default"]}"
            alt="" />
            <img class="next-modal switch" id="next-modal" onclick='nextModal(${JSON.stringify(pokemonItems)})' src="./assets/icons/angles-right-solid.svg" alt="">
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

function evolutionHTMLtemplate(imgUrl, name) {
  return `<div class="evo-imgs">
    <img class="evo-img" src="${imgUrl}">
    <div class="evo-names">
    <p>${name}</p>
    </div>
    </div>`;
}

function evolutionHTMLtemplateForMoreMembers(imgUrl, name) {
  return `<div class="separator"><img
            class="angle-right"
            src="./assets/icons/angles-right-solid.svg"
            alt="angle right"
          /></div>
          <div class="evo-imgs">
          <img class="evo-img" src="${imgUrl}">
          <div class="evo-names">
          <p>${name}</p>
          </div>
          </div>`;
}

function evolutionHTMLtemplateForThreeMembers(imgUrl2, imgUrl3, name2, name3) {
  return `<div class="separator">
          <img
            class="angle-right"
            src="./assets/icons/angles-right-solid.svg"
            alt="angle right"
          /></div><div class="evo-imgs">
          <img class="evo-img" src="${imgUrl2}">
          <div class="evo-names">
          <p>${name2}</p>
          </div>
          </div>
          <div class="separator">
          <img
            class="angle-right"
            src="./assets/icons/angles-right-solid.svg"
            alt="angle right"
          /></div><div class="evo-imgs">
          <img class="evo-img" src="${imgUrl3}">
          <div class="evo-names"><p>${name3}</p>
          </div> 
          </div>`;
}

function searchFieldTemplate(){
  return `<label for="pokemon-search">Which Pokemon are you looking for?</label>
          <input type="text" id="pokemon-search" onkeyup="keyUpFunction()" />`
}