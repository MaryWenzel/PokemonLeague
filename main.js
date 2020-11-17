// require('dotenv').config();

//Where the Pokemon Arrays are populated
let arrayOfPokemon;
let pokeInfoArray1;
let pokeInfoArray2;

//To Load Pokemon List
window.onload = function () {
    getPokemon();
};

//Fetches the Pokemon from the API
const getPokemon = () => {
    fetch ('https://pokeapi.co/api/v2/pokemon?limit=386')
    .then(response => response.json())
    .then(pokemon => arrayOfPokemon = pokemon)
    setTimeout(function() {
        console.log(arrayOfPokemon)
    }, 1000)
};

//Will Capitalize the Pokemon Names
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  };

//Generates First Pokemon
const generatePokemon = () => {
    let randomPokemonOne = arrayOfPokemon.results[Math.floor(Math.random() * 386)];
    console.log(randomPokemonOne);
    console.log(randomPokemonOne.url);
    fetch (randomPokemonOne.url)
    .then(response => response.json())
    .then(pokemon => pokeInfoArray1 = pokemon)
    setTimeout(function() {
        console.log(pokeInfoArray1)
    }, 1000)
    let firstPokemon = document.getElementById('first-pokemon-section');
    firstPokemon.innerHTML = null;
    setTimeout(function() {
        const li = document.createElement('li');
        const img = document.createElement('img');
        const ul = document.createElement('ul');
        const name = document.createTextNode(`${capitalize(pokeInfoArray1.name)}`)
        const type1 = document.createTextNode(`${capitalize(pokeInfoArray1.types[0]["type"]["name"])}`)
        // img.src = pokeInfoArray1.sprites.front_default
        img.src = pokeInfoArray1["sprites"]["other"]['official-artwork']["front_default"];
        firstPokemon.appendChild(img)
        li.appendChild(name)
        li.appendChild(ul)
        li.appendChild(type1)
        firstPokemon.append(li)
    }, 1000)
};

//Generates Second Pokemon
const generateSecondPokemon = () => {
    let randomPokemonTwo = arrayOfPokemon.results[Math.floor(Math.random() * 386)];
    console.log(randomPokemonTwo);
    console.log(randomPokemonTwo.url);
    fetch (randomPokemonTwo.url)
    .then(response => response.json())
    .then(pokemon => pokeInfoArray2 = pokemon)
    setTimeout(function() {
        console.log(pokeInfoArray2)
    }, 1000)
    let secondPokemon = document.getElementById('second-pokemon-section');
    secondPokemon.innerHTML = null;
    setTimeout(function() {
        const li = document.createElement('li');
        const img = document.createElement('img');
        const ul = document.createElement('ul');
        const name = document.createTextNode(` ${capitalize(pokeInfoArray2.name)}`)
        // img.src = pokeInfoArray1.sprites.front_default
        img.src = pokeInfoArray2["sprites"]["other"]['official-artwork']["front_default"];
        secondPokemon.appendChild(img)
        li.appendChild(name)
        li.appendChild(ul)
        secondPokemon.append(li)
    }, 1000)
};

//Battle Button!
let pokemon1 = pokeInfoArray1;
let pokemon2 = pokeInfoArray2;

