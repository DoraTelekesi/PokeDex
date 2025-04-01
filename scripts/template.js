function pokemonCardTemplate(indexPokemon) {
  return `<div class="poke-card ${
    allPokemonItems[indexPokemon].types[0].type.name
  }">
          <div class="poke-card-header">
            <p id="poke-nr">${allPokemonItems[indexPokemon].id}#</p>
            <p id="poke-name">${allPokemonItems[indexPokemon].name}</p>
          </div>
          <div class="image-content">
            <img class="poke-img" id="poke-img" onclick='openModal(${indexPokemon})' src="${
    allPokemonItems[indexPokemon].sprites.other["official-artwork"][
      "front_default"
    ]
  }" alt="Pokemon-Image" />
          </div>
          <div class="poke-card-footer">
          ${getTypes(indexPokemon)}
          </div>
        </div>`;
}

function modalTemplate(indexPokemon) {
  return `<div class="modal-header">
            <h2>#${allPokemonItems[indexPokemon].id}</h2>
            <h2>${allPokemonItems[indexPokemon].name.toUpperCase()}</h2>
          </div>
          <div class="modal-img-content ${
            allPokemonItems[indexPokemon].types[0].type.name
          }">
          <img class="previous-modal switch" id="previous-modal" onclick='previousModal(${indexPokemon})' src="./assets/icons/angles-left-solid.svg" alt="">
            <img class="modal-img"
            src="${
              allPokemonItems[indexPokemon].sprites.other["official-artwork"][
                "front_default"
              ]
            }"
            alt="" />
            <img class="next-modal switch" id="next-modal" onclick='nextModal(${indexPokemon})' src="./assets/icons/angles-right-solid.svg" alt="">
          </div>
          <div class="modal-type">${getTypes(indexPokemon)}</div>
          <div class="modal-btns">
            <span id="main-btn" class="modal-btn" onclick="openMain()">Main</span>
            <span id="stats-btn" class="modal-btn" onclick="openStats()">Stats</span>
            <span id="evo-chain-btn" class="modal-btn" onclick="openEvoChain()">Evo Chain</span>
          </div>
          <div class="info-body">
          
            <table id="main" class="main main-dp-none">
              <tr><td>Height</td><td>:</td><td>${
                allPokemonItems[indexPokemon].height
              }</td></tr>
              <tr><td>Weight<td>:</td><td>${
                allPokemonItems[indexPokemon].weight
              }</td></tr>
              <tr><td>Base Experience<td>:</td> <td>${
                allPokemonItems[indexPokemon]["base_experience"]
              }</td></tr>
              <tr><td>Abilities<td>:</td><td>${getAbilities(
                indexPokemon
              )}</td></tr>
            </table>
            <table id="stats" class="stats stats-dp-none">
            ${getStats(indexPokemon)}
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

function searchFieldTemplate() {
  return `<input type="text" placeholder="Search Pokemon" id="pokemon-search" onkeyup="keyUpFunction()" />`;
}
