//keyup event is triggered when a key is released

function keyUpFunction() {
  //we search for the input value in the DOM
  let inputValueRef = document.getElementById("pokemon-search");
  //only when we type more than 2 letters should do a search
  if (inputValueRef.value.length > 2) {
    searchNames(allPokemonItems);
    // if we clear the input, or it is clear, it should render again all our Pokemons (the actualized list, not only the first 20 Pokemon)
  } else if (inputValueRef.value === "") {
    renderPokemons(allPokemonItems);
    enableLoadButton();
  }
}

// first we declared globally an Array, which should contain later our filtered Pokemons
let filteredPokemonItems = [];

function searchNames(pokemonList) {
  // we need our input value to be lower cased
  let inputValue = document
    .getElementById("pokemon-search")
    .value.toLowerCase();
  //we filter our main allPokemonItems array, and if there is a name inside, which includes the letters, which are given in the input field, than it collects them in filteredPokemonItems array
  //that also should be lower cased
  filteredPokemonItems = pokemonList.filter((item) =>
    item.name.toLowerCase().includes(inputValue)
  );
  renderFilteredPokemon(filteredPokemonItems);
}

//when we click on the logo and title on the top, it should also render back all my original Pokemons - allPokemonItems
function loadBack() {
  let inputValueRef = document.getElementById("pokemon-search");
  if (inputValueRef.value.length > 0) {
    inputValueRef.value = "";
  }
  filteredPokemonItems = [];
  renderPokemons(allPokemonItems);
  enableLoadButton();
}

//we want to show only those Pokemons, which are satisfactory to our search
function renderFilteredPokemon(pokemonList) {
  // in this case is better if we are disable our "load more Pokemon" button
  disableLoadButton();
  //it should empty first the DOM
  document.getElementById("main-content").innerHTML = "";
  for (let i = 0; i < pokemonList.length; i++) {
    //it should check the index of the pokemon, by comparing the item name of the filtered Array to the item name of our allPokemonlist
    //and we use that index to display the correct pokemon
    //in case of Charmande, Charmeleon and Charizard, the index will be 3, 4 and 5
    let index = allPokemonItems.findIndex(
      (item) => item.name === pokemonList[i].name
    );
    document.getElementById("main-content").innerHTML +=
      pokemonCardTemplate(index);
  }
}
