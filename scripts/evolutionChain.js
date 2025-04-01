async function fetchJson(url) {
  try {
    let response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error("Response Failed");
  }
}

async function fetchEvolutionData(url) {
  let speciesData = await fetchJson(url);
  console.log(speciesData);
  let evolutionChainData = await fetchJson(speciesData.evolution_chain.url);
  console.log(evolutionChainData);
  return evolutionChainData;
}

async function fetchVarietyData(speciesUrl) {
  let speciesData = await fetchJson(speciesUrl);
  let varietyData = await fetchJson(speciesData.varieties[0].pokemon.url);
  return varietyData;
}

async function showFirstMember(evolutionChainData) {
  let firstVarietyData = await fetchVarietyData(
    evolutionChainData.chain.species.url
  );
  document.getElementById("evo-chain").innerHTML += evolutionHTMLtemplate(
    firstVarietyData.sprites.other["official-artwork"]["front_default"],
    evolutionChainData.chain.species.name
  );
}

// in case of Eevee #133 !!
async function showMultipleMembers(evolutionChainData) {
  for (let i = 0; i < evolutionChainData.chain.evolves_to.length; i++) {
    let nextVarietyData = await fetchVarietyData(
      evolutionChainData.chain.evolves_to[i].species.url
    );
    document.getElementById("evo-chain").style.overflowX = "scroll";
    document.getElementById("evo-chain").innerHTML +=
      evolutionHTMLtemplateForMoreMembers(
        nextVarietyData.sprites.other["official-artwork"]["front_default"],
        evolutionChainData.chain.evolves_to[i].species.name
      );
  }
}

async function showSecondAndThirdMembers(evolutionChainData) {
  let secondVarietyData = await fetchVarietyData(
    evolutionChainData.chain.evolves_to[0].species.url
  );
  if (evolutionChainData.chain.evolves_to[0].evolves_to.length !== 0) {
    let thirdVarietyData = await fetchVarietyData(
      evolutionChainData.chain.evolves_to[0].evolves_to[0].species.url
    );
    document.getElementById("evo-chain").innerHTML +=
      evolutionHTMLtemplateForThreeMembers(
        secondVarietyData.sprites.other["official-artwork"]["front_default"],
        thirdVarietyData.sprites.other["official-artwork"]["front_default"],
        evolutionChainData.chain.evolves_to[0].species.name,
        evolutionChainData.chain.evolves_to[0].evolves_to[0].species.name
      );
  } else {
    document.getElementById("evo-chain").innerHTML +=
      evolutionHTMLtemplateForMoreMembers(
        secondVarietyData.sprites.other["official-artwork"]["front_default"],
        evolutionChainData.chain.evolves_to[0].species.name
      );
  }
}

async function showEvolutionChain(i) {
  let evolutionChainData = await fetchEvolutionData(
    allPokemonItems[i].species.url
  );
  await showFirstMember(evolutionChainData);
  if (evolutionChainData.chain.evolves_to.length > 1) {
    await showMultipleMembers(evolutionChainData);
  } else if (evolutionChainData.chain.evolves_to.length !== 0) {
    await showSecondAndThirdMembers(evolutionChainData);
  }
}
