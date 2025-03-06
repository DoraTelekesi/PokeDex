function pokemonCardTemplate(pokemonItems){
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