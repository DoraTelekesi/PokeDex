async function keyUpFunction(){
  let inputValueRef = document.getElementById("pokemon-search")
  if (inputValueRef.value.length > 2){
    searchNames(allPokemonItem);
  } else if(inputValueRef.value === "") {

      await showAllPokemon(URLS);
      updateURLS();
      showNewPokemon(newUrls);
    }
  
  // else {
  //   inputValueRef.value = "";
  // }
}

function searchNames(arr) {
  let inputValue = document.getElementById("pokemon-search").value.toLowerCase();
  let filteredPokemonItems = arr.filter(item => item.name.toLowerCase().includes(inputValue));
  renderFilteredPokemon(filteredPokemonItems);
}

function renderFilteredPokemon(arr) {
  document.getElementById("main-content").innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    document.getElementById("main-content").innerHTML += pokemonCardTemplate(arr[i]);
  }
}

