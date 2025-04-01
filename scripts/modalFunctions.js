function getStats(indexPokemon) {
  let statsHTML = "";
  for (
    let indexStats = 0;
    indexStats < allPokemonItems[indexPokemon].stats.length;
    indexStats++
  ) {
    let percent =
      allPokemonItems[indexPokemon].stats[indexStats].base_stat / 110;
    percent = Math.round(percent * 100);
    statsHTML += `<tr><td>${allPokemonItems[indexPokemon].stats[indexStats].stat.name}</td><td>:</td><td><div class="progress-bar"><div class="progress-bar-filling" style="width:${percent}%"></div></div></td></tr>`;
  }
  return statsHTML;
}

function getAbilities(indexPokemon) {
  abilitiesArr = [];
  for (
    let indexAbility = 0;
    indexAbility < allPokemonItems[indexPokemon].abilities.length;
    indexAbility++
  ) {
    abilitiesArr.push(
      allPokemonItems[indexPokemon].abilities[indexAbility].ability.name
    );
  }
  return abilitiesArr;
}

function openModal(indexPokemon) {
  document.getElementById("modal-content").innerHTML =
    modalTemplate(indexPokemon);
  document.getElementById("modal-content").classList.remove("modal-closed");
  document.getElementById("overlay").classList.remove("overlay-dp-none");
  document.getElementById("main").classList.remove("main-dp-none");
  document.getElementById("main-btn").style =
    "border-bottom:2px solid rgb(219, 151, 25)";
  document.getElementById("stats").classList.add("stats-dp-none");
  document.getElementById("evo-chain").classList.add("evo-dp-none");
  document.documentElement.style.overflow = "hidden";
  document.body.scroll = "no";
  showEvolutionChain(indexPokemon);
}

function closeModal() {
  document.getElementById("overlay").classList.add("overlay-dp-none");
  document.getElementById("modal-content").classList.add("modal-closed");
  document.documentElement.style.overflow = "scroll";
  document.body.scroll = "yes";
}

function nextModal(indexPokemon) {
  let pokemonList =
    filteredPokemonItems.length > 0 ? filteredPokemonItems : allPokemonItems;

  let currentIndex = pokemonList.findIndex(
    (pokemon) => pokemon.id === allPokemonItems[indexPokemon].id
  );

  let nextIndex = currentIndex + 1;

  if (nextIndex >= pokemonList.length) {
    nextIndex = 0;
  }

  let nextPokemonIndex = allPokemonItems.findIndex(
    (pokemon) => pokemon.id === pokemonList[nextIndex].id
  );
  document.getElementById("modal-content").innerHTML =
    modalTemplate(nextPokemonIndex);
  openMain();
  showEvolutionChain(nextPokemonIndex);
}

function previousModal(indexPokemon) {
  let pokemonList =
    filteredPokemonItems.length > 0 ? filteredPokemonItems : allPokemonItems;
  let currentIndex = pokemonList.findIndex(
    (pokemon) => pokemon.id === allPokemonItems[indexPokemon].id
  );
  let previousIndex = currentIndex - 1;
  if (previousIndex < 0) {
    previousIndex = pokemonList.length - 1;
  }
  let previousPokemonIndex = allPokemonItems.findIndex(
    (pokemon) => pokemon.id === pokemonList[previousIndex].id
  );
  document.getElementById("modal-content").innerHTML =
    modalTemplate(previousPokemonIndex);
  openMain();
  showEvolutionChain(previousPokemonIndex);
}

function openStats() {
  document.getElementById("main").classList.add("main-dp-none");
  document.getElementById("stats-btn").style =
    "border-bottom:2px solid rgb(219, 151, 25)";
  document.getElementById("main-btn").style = "";
  document.getElementById("stats").classList.remove("stats-dp-none");
  document.getElementById("evo-chain-btn").style = "";
  document.getElementById("evo-chain").classList.add("evo-dp-none");
  document.getElementById("evo-chain").style.display = "none";
}
function openMain() {
  document.getElementById("main").classList.remove("main-dp-none");
  document.getElementById("main-btn").style =
    "border-bottom:2px solid rgb(219, 151, 25)";
  document.getElementById("stats-btn").style = "";
  document.getElementById("stats").classList.add("stats-dp-none");
  document.getElementById("evo-chain-btn").style = "";
  document.getElementById("evo-chain").classList.add("evo-dp-none");
  document.getElementById("evo-chain").style.display = "none";
}

function openEvoChain() {
  document.getElementById("stats").classList.add("stats-dp-none");
  document.getElementById("main").classList.add("main-dp-none");
  document.getElementById("evo-chain").classList.remove("evo-dp-none");
  document.getElementById("evo-chain-btn").style =
    "border-bottom:2px solid rgb(219, 151, 25)";
  document.getElementById("stats-btn").style = "";
  document.getElementById("main-btn").style = "";
  document.getElementById("evo-chain").style.display = "flex";
}
