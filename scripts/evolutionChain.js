async function fetchJson(url) {
  try {
    let response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error("something went wrong");
  }
}


async function fetchEvolutionData(url) {
  let speciesData = await fetchJson(url);
  let evolutionChainData = await fetchJson(speciesData.evolution_chain.url);
  return evolutionChainData;
}

async function fetchVarietyData(speciesUrl) {
  let speciesData = await fetchJson(speciesUrl);
  let varietyData = await fetchJson(speciesData.varieties[0].pokemon.url);
  return varietyData;
}

async function showFirstMember(evolutionChainData) {
  let firstVarietyData = await fetchVarietyData(evolutionChainData.chain.species.url);
  document.getElementById("evo-chain").innerHTML += evolutionHTMLtemplate(firstVarietyData.sprites.other["official-artwork"]["front_default"], evolutionChainData.chain.species.name);
}

async function showMultipleMembers(evolutionChainData) {
  for (let i = 0; i < evolutionChainData.chain.evolves_to.length; i++) {
    let nextVarietyData = await fetchVarietyData(evolutionChainData.chain.evolves_to[i].species.url);
    document.getElementById("evo-chain").style.overflowX = "scroll";
    document.getElementById("evo-chain").innerHTML += evolutionHTMLtemplateForMoreMembers(nextVarietyData.sprites.other["official-artwork"]["front_default"], evolutionChainData.chain.evolves_to[i].species.name);
  }
}

async function showSecondAndThirdMembers(evolutionChainData) {
  let secondVarietyData = await fetchVarietyData(evolutionChainData.chain.evolves_to[0].species.url);
  if (evolutionChainData.chain.evolves_to[0].evolves_to.length !== 0) {
    let thirdVarietyData = await fetchVarietyData(evolutionChainData.chain.evolves_to[0].evolves_to[0].species.url);
    document.getElementById("evo-chain").innerHTML += evolutionHTMLtemplateForThreeMembers(secondVarietyData.sprites.other["official-artwork"]["front_default"], thirdVarietyData.sprites.other["official-artwork"]["front_default"], evolutionChainData.chain.evolves_to[0].species.name, evolutionChainData.chain.evolves_to[0].evolves_to[0].species.name);
  } else {
    document.getElementById("evo-chain").innerHTML += evolutionHTMLtemplateForMoreMembers(secondVarietyData.sprites.other["official-artwork"]["front_default"], evolutionChainData.chain.evolves_to[0].species.name);
  }
}

async function showEvolutionChain(pokemonItems) {
  let evolutionChainData = await fetchEvolutionData(pokemonItems.species.url);
  await showFirstMember(evolutionChainData);
  if (evolutionChainData.chain.evolves_to.length > 1) {
    await showMultipleMembers(evolutionChainData);
  } else if (evolutionChainData.chain.evolves_to.length !== 0) {
    await showSecondAndThirdMembers(evolutionChainData);
  }
}


// My original code:


// async function showEvolutionChain(pokemonItems){
//     // Fetch the species data for the given Pokemon
//     let responseSpecies = await fetch(pokemonItems.species.url);
//     let speciesData = await responseSpecies.json();
//     // Fetch the evolution chain data for the species
//     let responseEvoChain = await fetch(speciesData.evolution_chain.url);
//     let evolutionChainData = await responseEvoChain.json();

//     // Fetch the first member of the evolution chain
//     let responseFirstSpecies = await fetch(evolutionChainData.chain.species.url)
//     let firstSpeciesData = await responseFirstSpecies.json();
//     let responseFirstVariety = await fetch(firstSpeciesData.varieties[0].pokemon.url);
//     let firstVarietyData = await responseFirstVariety.json();
//     // Show the first member of the evolution chain
//     document.getElementById("evo-chain").innerHTML += `
//     <div class="evo-imgs">
//     <img class="evo-img" src="${firstVarietyData.sprites.other["official-artwork"]["front_default"]}">
//     <div class="evo-names">
//     <p>${evolutionChainData.chain.species.name}</p>
//     </div>
//     </div>`

//     // If there are more than 3 members in the evolution chain (e.g., Eevee #133)
//     if (evolutionChainData.chain.evolves_to.length > 1) {
//       for (let i = 0; i < evolutionChainData.chain.evolves_to.length; i++) {
//           let responseNextSpecies = await fetch(evolutionChainData.chain.evolves_to[i].species.url)
//           let nextSpeciesData = await responseNextSpecies.json();
//           let responseNextVariety = await fetch(nextSpeciesData.varieties[0].pokemon.url);
//           let nextVarietyData = await responseNextVariety.json();
//           console.log(nextVarietyData.sprites.other["official-artwork"]["front_default"])
//           document.getElementById("evo-chain").style.overflowX = "scroll";
//           document.getElementById("evo-chain").innerHTML += `<div class="separator">>></div>
//           <div class="evo-imgs">
//           <img class="evo-img" src="${nextVarietyData.sprites.other["official-artwork"]["front_default"]}">
//           <div class="evo-names">
//           <p>${evolutionChainData.chain.evolves_to[i].species.name}</p>
//           </div> 
//           </div> 
//           `
//       }
//     } else {
//       if (evolutionChainData.chain.evolves_to.length !== 0) {
//         // Fetch the second member of the evolution chain
//         let responseSecondSpecies = await fetch(evolutionChainData.chain.evolves_to[0].species.url)
//         let secondSpeciesData = await responseSecondSpecies.json();
//         let responseSecondVariety = await fetch(secondSpeciesData.varieties[0].pokemon.url);
//         let secondVarietyData = await responseSecondVariety.json();

//         if (evolutionChainData.chain.evolves_to[0].evolves_to.length !== 0) {
//           // Fetch the third member of the evolution chain
//           let responseThirdSpecies = await fetch(evolutionChainData.chain.evolves_to[0].evolves_to[0].species.url)
//           let thirdSpeciesData = await responseThirdSpecies.json();
//           let responseThirdVariety = await fetch(thirdSpeciesData.varieties[0].pokemon.url);
//           let thirdVarietyData = await responseThirdVariety.json();
//           // Show the second and third members of the evolution chain
//           document.getElementById("evo-chain").innerHTML += `<div class="separator">>></div><div class="evo-imgs">
//           <img class="evo-img" src="${secondVarietyData.sprites.other["official-artwork"]["front_default"]}">
//           <div class="evo-names">
//           <p>${evolutionChainData.chain.evolves_to[0].species.name}</p>
//           </div>
//           </div>
//           <div class="separator">>></div><div class="evo-imgs">
//           <img class="evo-img" src="${thirdVarietyData.sprites.other["official-artwork"]["front_default"]}">
//           <div class="evo-names"><p>${evolutionChainData.chain.evolves_to[0].evolves_to[0].species.name}</p>
//           </div> 
//           </div>`
//         } else {
//           // Show the second member of the evolution chain
//           document.getElementById("evo-chain").innerHTML += `<div class="separator">>></div><div class="evo-imgs">
//           <img class="evo-img" src="${secondVarietyData.sprites.other["official-artwork"]["front_default"]}">
//           <div class="evo-names">
//           <p>${evolutionChainData.chain.evolves_to[0].species.name}</p>
//           </div>
//           </div>`
//         }
//       }
//     }
// }