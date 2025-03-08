function getStats(pokemonItems){
  let statsHTML = "";
  for (let i= 0; i < pokemonItems.stats.length; i++) {
    let percent= pokemonItems.stats[i].base_stat / 110;
    percent = Math.round(percent * 100)
    statsHTML += `<tr><td>${pokemonItems.stats[i].stat.name}</td><td>:</td><td><div class="progress-bar"><div class="progress-bar-filling" style="width:${percent}%"></div></div></td></tr>`;
  }
  return statsHTML;
}

function getAbilities(pokemonItems){
  abilitiesArr = [];
  for (let i =0; i < pokemonItems.abilities.length; i++) {
    abilitiesArr.push(pokemonItems.abilities[i].ability.name)
  }
  return abilitiesArr;
}

function openModal(pokemonItems){
  console.log(typeof pokemonItems)
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

  function nextModal(currentPokemon) {
    let currentIndex = allPokemonItem.findIndex(pokemon => pokemon.id === currentPokemon.id);
    if (currentIndex !== -1 && currentIndex < allPokemonItem.length - 1) {
      let nextPokemon = allPokemonItem[currentIndex + 1];
      document.getElementById("modal-content").innerHTML = modalTemplate(nextPokemon);
      showEvolutionChain(currentPokemon)
      openEvoChain()
      
      console.log(nextPokemon.id);
    } else {
      console.log("No next Pokémon available");
    }
  }
  
  function previousModal(currentPokemon) {
    let currentIndex = allPokemonItem.findIndex(pokemon => pokemon.id === currentPokemon.id);
    if (currentIndex > 0) {
      let previousPokemon = allPokemonItem[currentIndex - 1];
      document.getElementById("modal-content").innerHTML = modalTemplate(previousPokemon);
      showEvolutionChain(currentPokemon)
      openEvoChain()
      
      console.log(previousPokemon.id);
    } else {
      console.log("No previous Pokémon available");
    }
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
    document.getElementById("stats").classList.add("stats-dp-none");
    document.getElementById("main").classList.add("main-dp-none");
    document.getElementById("evo-chain").classList.remove("evo-dp-none");
    document.getElementById("evo-chain-btn").style = "border-bottom:2px solid rgb(219, 151, 25)";
    document.getElementById("stats-btn").style = "";
    document.getElementById("main-btn").style = "";
    document.getElementById("evo-chain").style.display = "flex";
  }
  