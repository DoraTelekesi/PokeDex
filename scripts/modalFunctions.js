// stats is an array with 6 Objects in it, we should iterate them through
function getStats(indexPokemon){
  let statsHTML = "";
  for (let indexStats= 0; indexStats < allPokemonItems[indexPokemon].stats.length; indexStats++) {
    //if the maximum stat is 110, we should divide the given stat by 110, multiply it with 100, and then round it to get the percent
    let percent= allPokemonItems[indexPokemon].stats[indexStats].base_stat / 110;
    percent = Math.round(percent * 100)
    //we use that percent for the progress bar filling width
    statsHTML += `<tr><td>${allPokemonItems[indexPokemon].stats[indexStats].stat.name}</td><td>:</td><td><div class="progress-bar"><div class="progress-bar-filling" style="width:${percent}%"></div></div></td></tr>`;
  }
  return statsHTML;
}
// abilities is an array with Objects we should iterate them through
function getAbilities(indexPokemon){
  abilitiesArr = [];
  for (let indexAbility =0; indexAbility < allPokemonItems[indexPokemon].abilities.length; indexAbility++) {
    //the abilities name we push into this new array
    abilitiesArr.push(allPokemonItems[indexPokemon].abilities[indexAbility].ability.name)
  }
  return abilitiesArr;
}

function openModal(indexPokemon){
    document.getElementById("modal-content").innerHTML = modalTemplate(indexPokemon);
    document.getElementById("modal-content").classList.remove("modal-closed");
    document.getElementById("overlay").classList.remove("overlay-dp-none");
    //at first it should show the main site
    document.getElementById("main").classList.remove("main-dp-none");
    document.getElementById("main-btn").style = "border-bottom:2px solid rgb(219, 151, 25)";
    //it should at first remove the stats and evo chain sites
    document.getElementById("stats").classList.add("stats-dp-none");
    document.getElementById("evo-chain").classList.add("evo-dp-none");
    // when we open the modal, an overlay should appear, and we should not be able to scroll the background, so we hide the overflow, and make it not scrollable
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no";
    showEvolutionChain(indexPokemon);
  }
  
  function closeModal(){
    document.getElementById("overlay").classList.add("overlay-dp-none");
    document.getElementById("modal-content").classList.add("modal-closed");
    //we set back the background to be scrollable, and its overflow not hidden
    document.documentElement.style.overflow = 'scroll';
    document.body.scroll = "yes";
  }

  function nextModal(indexPokemon) {
    // we declare a pokemonList which is our filtered List (if it exists), if yes we set it to filtered array, if not then to our original allPokemonItems
    let pokemonList = filteredPokemonItems.length > 0 ? filteredPokemonItems : allPokemonItems;
    // we need to find the index, becaues in case we make filter, it will be different than the original index of an item
    //we do that through searching fot the items` id, in case of Charmander - Charmeleon - Charizard : if we are in the filtered array Charmander index is 0, otherwise it is 3
    let currentIndex = pokemonList.findIndex(pokemon => pokemon.id === allPokemonItems[indexPokemon].id);
    //we switch to next modal
    let nextIndex = currentIndex + 1;
    // we dont want to go through the end of the array, so if the nextIndex number is a bigger nr than the length of the array, it should set back to index 0 - it goes to the beginning
    if (nextIndex >= pokemonList.length) {
        nextIndex = 0; // Wrap around to the beginning
    }
    // we need the original index af a pokemon too to display it on the modal, so we compare the id to get that
    let nextPokemonIndex = allPokemonItems.findIndex(pokemon => pokemon.id === pokemonList[nextIndex].id);
    document.getElementById("modal-content").innerHTML = modalTemplate(nextPokemonIndex);
    openMain();
    showEvolutionChain(nextPokemonIndex);
}

function previousModal(indexPokemon) {
  // we declare a pokemonList which is our filtered List (if it exists), if yes we set it to filtered array, if not then to our original allPokemonItems
  let pokemonList = filteredPokemonItems.length > 0 ? filteredPokemonItems : allPokemonItems;
      // we need to find the index, becaues in case we make filter, it will be different than the original index of an item
    //we do that through searching fot the items` id, in case of Charmander - Charmeleon - Charizard : if we are in the filtered array Charmander index is 0, otherwise it is 3
  let currentIndex = pokemonList.findIndex(pokemon => pokemon.id === allPokemonItems[indexPokemon].id);
  //we switch to the previous modal
  let previousIndex = currentIndex - 1;
// we dont want to go through the beginning of the array, so if the previousIndex number is a smaller nr than the length of the array minus 1, it should set back to the last index - it goes to the end
  if (previousIndex < 0) {
      previousIndex = pokemonList.length - 1; // Wrap around to the end
  }
// we need the original index af a pokemon too to display it on the modal, so we compare the id to get that
  let previousPokemonIndex = allPokemonItems.findIndex(pokemon => pokemon.id === pokemonList[previousIndex].id);

  document.getElementById("modal-content").innerHTML = modalTemplate(previousPokemonIndex);
  openMain();
  showEvolutionChain(previousPokemonIndex);
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
  



