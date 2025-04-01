function keyUpFunction() {
  let inputValueRef = document.getElementById("pokemon-search");
  if (inputValueRef.value.length > 2) {
    searchNames(allPokemonItems);
  } else if (inputValueRef.value === "") {
    renderPokemons(allPokemonItems);
    filteredPokemonItems = [];
    enableLoadButton();
  }
}

let filteredPokemonItems = [];

function searchNames(pokemonList) {
  let inputValue = document
    .getElementById("pokemon-search")
    .value.toLowerCase();
  filteredPokemonItems = pokemonList.filter((item) =>
    item.name.toLowerCase().includes(inputValue)
  );
  renderFilteredPokemon(filteredPokemonItems);
}

function loadBack() {
  let inputValueRef = document.getElementById("pokemon-search");
  if (inputValueRef.value.length > 0) {
    inputValueRef.value = "";
  }

  renderPokemons(allPokemonItems);
  filteredPokemonItems = [];
  enableLoadButton();
}

function renderFilteredPokemon(pokemonList) {
  disableLoadButton();
  document.getElementById("main-content").innerHTML = "";
  for (let i = 0; i < pokemonList.length; i++) {
    let index = allPokemonItems.findIndex(
      (item) => item.name === pokemonList[i].name
    );
    document.getElementById("main-content").innerHTML +=
      pokemonCardTemplate(index);
  }
}
