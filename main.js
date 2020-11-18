// require('dotenv').config();

//Where the Pokemon Arrays are populated
let arrayOfPokemon;
let pokeInfoArray1;
let pokeInfoArray2;

//Where Pokemon Type Arrays are populated

let poke1Type1Array;
let poke1Type2Array;
let poke2Type1Array;
let poke2Type2Array;

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
        // const type2 = document.createTextNode(`${capitalize(pokeInfoArray1.types[1]["type"]["name"])}`)

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
        const type1 = document.createTextNode(`${capitalize(pokeInfoArray2.types[0]["type"]["name"])}`)
        // img.src = pokeInfoArray1.sprites.front_default
        img.src = pokeInfoArray2["sprites"]["other"]['official-artwork']["front_default"];
        secondPokemon.appendChild(img)
        li.appendChild(name)
        li.appendChild(ul)
        li.appendChild(type1)
        secondPokemon.append(li)
    }, 1000)
};

//Battle Button!
const pokemonBattle = () => {
    //Fetch Type 1 of Pokemon 1
    fetch (pokeInfoArray1.types[0].type.url)
    .then(response => response.json())
    .then(pokemon => poke1Type1Array = pokemon)
    //Fetch Type 1 of Pokemon 2
    fetch (pokeInfoArray2.types[0].type.url)
    .then(response => response.json())
    .then(pokemon => poke2Type1Array = pokemon)
    //Log Damage Relationships
    setTimeout(function() {
        console.log(poke1Type1Array['damage_relations'])
        console.log(poke2Type1Array['damage_relations'])
    }, 1000)

    //Double Damage Determiner
    const doubleDamage = () => {
        //Move values into an array for far easier comparison
        let superArray = poke1Type1Array['damage_relations']['double_damage_to'].map(({ name }) => name);
        console.log(superArray);

        if (poke1Type1Array['damage_relations']['double_damage_to'].length === 0) {
            console.log("Not Super Effective");
            console.log("theFirstOne");
            return false;
        } else {
                if (superArray.includes(poke2Type1Array['name'])) {
                    console.log('Super Effective!');
                    return true;
                } else {
                    console.log('Else');
                    console.log("Not Super Effective");
                    return false;
                }
        }
    }

    // //Damage Resistance Determiner
    // const damageResistance = () => {
    //     //Move values into an array for far easier comparison
    //     let resistanceArray = poke1Type1Array
    // }

    setTimeout(function() {
        const firstPlayer = document.getElementById('first-result');
        const secondPlayer = document.getElementById('second-result');
        const banner = document.createElement('H1');
        const bannerTwo = document.createElement('H1');
        const winner = document.createTextNode(` Winner! `);
        const loser = document.createTextNode(` Loser.`);
        doubleDamage();
        if (doubleDamage() === true) {
            banner.appendChild(winner)
            firstPlayer.append(banner);

            bannerTwo.appendChild(loser)
            secondPlayer.append(bannerTwo);
        } else {
            bannerTwo.appendChild(winner)
            secondPlayer.append(bannerTwo);

            banner.appendChild(loser)
            firstPlayer.append(banner);
        }
    }, 1000)

}


