
// anytime we fetch an URL first we get the response, but we need to convert them into a json every time
async function fetchJson(url) {
  try {
    let response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error("Response Failed");
  }
}


async function fetchEvolutionData(url) {
  // every pokemon has a species attribute with an url we need to fetch
  let speciesData = await fetchJson(url);
  console.log(speciesData)
  //inside species there is also an evolution chain attribute with an url we need to fetch
  let evolutionChainData = await fetchJson(speciesData.evolution_chain.url);
  console.log(evolutionChainData)
  return evolutionChainData;
}

async function fetchVarietyData(speciesUrl) {
  // every pokemon has a species attribute with an url we need to fetch
  let speciesData = await fetchJson(speciesUrl);
  // console.log(speciesData)
  //under species, there is a variety attribue, to reach the first member of evolution chain, or general to reach the main url from a pokemon
  let varietyData = await fetchJson(speciesData.varieties[0].pokemon.url);
  // console.log(varietyData)
  return varietyData;
}

async function showFirstMember(evolutionChainData) {
    //under species, there is a variety attribue, to reach the first member of evolution chain, or general to reach the main url from a pokemon
  let firstVarietyData = await fetchVarietyData(evolutionChainData.chain.species.url);
  document.getElementById("evo-chain").innerHTML += evolutionHTMLtemplate(firstVarietyData.sprites.other["official-artwork"]["front_default"], evolutionChainData.chain.species.name);
}

// in case of Eevee #133 !!
async function showMultipleMembers(evolutionChainData) {
  // under evolution chain - chain - evolves to -  in case of Evvee - 
  // there is an array with 8 objects - refers to the 8 further member of the evolution chain
  //so we have to iterate through it
  for (let i = 0; i < evolutionChainData.chain.evolves_to.length; i++) {
    //we declare always the next variety so we reach each pokemon url
    let nextVarietyData = await fetchVarietyData(evolutionChainData.chain.evolves_to[i].species.url);
    //as we have more evo member, it wont fit into the container, we set a scroll when it overflows
    document.getElementById("evo-chain").style.overflowX = "scroll";
    //from a template we load the html for more members, for that we need the picture and the name from the Pokemon
    document.getElementById("evo-chain").innerHTML += evolutionHTMLtemplateForMoreMembers(nextVarietyData.sprites.other["official-artwork"]["front_default"], evolutionChainData.chain.evolves_to[i].species.name);
  }
}
// when a evolution chain has 2 or 3 members, we can find under - evo-chain-evolves to[0], the third member under evo-chain-evolves-to[0]-evolves-to[0]

async function showSecondAndThirdMembers(evolutionChainData) {
  let secondVarietyData = await fetchVarietyData(evolutionChainData.chain.evolves_to[0].species.url);
  //if there are 3 members so the second evolves-to attribute is longer than 0, we give extra 2 names and 2 pictures, from second and third varietydata
  if (evolutionChainData.chain.evolves_to[0].evolves_to.length !== 0) {
    let thirdVarietyData = await fetchVarietyData(evolutionChainData.chain.evolves_to[0].evolves_to[0].species.url);
    document.getElementById("evo-chain").innerHTML += evolutionHTMLtemplateForThreeMembers(secondVarietyData.sprites.other["official-artwork"]["front_default"], thirdVarietyData.sprites.other["official-artwork"]["front_default"], evolutionChainData.chain.evolves_to[0].species.name, evolutionChainData.chain.evolves_to[0].evolves_to[0].species.name);
  } else {
    document.getElementById("evo-chain").innerHTML += evolutionHTMLtemplateForMoreMembers(secondVarietyData.sprites.other["official-artwork"]["front_default"], evolutionChainData.chain.evolves_to[0].species.name);
  }
}
//we use this function when we open a Modal
async function showEvolutionChain(i) {
  //we have to reach the evo chain data everywhere before we use our functions
  let evolutionChainData = await fetchEvolutionData(allPokemonItems[i].species.url);
  //if there is only one member it shows first
  await showFirstMember(evolutionChainData);
  //when evo-chain-evolves-to has only 1 length - there should be 2 or 3 member, othervise it should be more members
  if (evolutionChainData.chain.evolves_to.length > 1) {
    await showMultipleMembers(evolutionChainData);
  } else if (evolutionChainData.chain.evolves_to.length !== 0) {
    await showSecondAndThirdMembers(evolutionChainData);
  }
}

