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

//Where Pokedex Entries are populated
let pokedexPortal;
let pokedex1Array;
let pokedex2Array;

//To Load Pokemon List
onload = function () {
    getPokemon(fetch);
    getPokedex(fetch);
};

//Fetches the Pokemon from the API
const getPokemon = (fetch) => {
    fetch ('https://pokeapi.co/api/v2/pokemon?limit=700')
    .then(response => response.json())
    .then(pokemon => arrayOfPokemon = pokemon)
    setTimeout(function() {
        console.log(arrayOfPokemon)
    }, 1000)
};

const getPokedex = (fetch) => {
    fetch ('https://pokeapi.co/api/v2/pokedex/1/')
    .then(response => response.json())
    .then(pokedex => pokedexPortal = pokedex)
    setTimeout(function() {
        console.log(pokedexPortal)
    }, 1000)
}

//Will Capitalize the Pokemon Names
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  };

//Generates First Pokemon
const generatePokemon = () => {
    //Hide Previous Winner and Loser
    document.getElementById("first-result").innerHTML = "";
    document.getElementById("second-result").innerHTML = "";
    //Hides Previous Pokedex Entries
    let dexSection1 = document.getElementById("pokedex-1");
    dexSection1.innerHTML = null;
    //Generate Random Pokemon!
    let randomPokemonOne = arrayOfPokemon.results[Math.floor(Math.random() * 700)];
    console.log(randomPokemonOne);
    console.log(randomPokemonOne.url);
    fetch (randomPokemonOne.url)
    .then(response => response.json())
    .then(pokemon => pokeInfoArray1 = pokemon)
    setTimeout(function() {
        console.log(pokeInfoArray1)
        console.log("Pokemon number is " + pokeInfoArray1.id);
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
        ul.appendChild(type1)
        if (pokeInfoArray1.types[1] !== undefined) {
            const ul = document.createElement('ul');
            const type2 = document.createTextNode(`${capitalize(pokeInfoArray1.types[1]["type"]["name"])}`)
            li.append(type2)
            ul.append(li)
        };
        //Generate Pokedex Entries!
        let dexSection = document.getElementById("pokedex-1");
        const button = document.createElement('button');
        button.innerHTML = "Pokédex"
        button.classList.add("pokedex")
        const ul2 = document.createElement('ul');
        dexSection.append(button)
        button.addEventListener('click', () => {
            dexSection.innerHTML = null;
            let pokeNumberOne = pokeInfoArray1.id;
            fetch (pokedexPortal["pokemon_entries"][pokeNumberOne-1]["pokemon_species"]["url"])
            .then(response => response.json())
            .then(pokemon => pokedex1Array = pokemon)
            setTimeout(function() {
                console.log(pokedex1Array)
                const li = document.createElement('ul');
                const text = document.createTextNode(`${pokedex1Array["flavor_text_entries"][0]["flavor_text"]}`)
                console.log(text);
                dexSection.appendChild(text)
                dexSection.appendChild(li);
            }, 1000)
        })



        firstPokemon.append(li)
    }, 1000)
};

//Generates Second Pokemon
const generateSecondPokemon = () => {
    //Hide Previous Winner and Loser
    document.getElementById("first-result").innerHTML = "";
    document.getElementById("second-result").innerHTML = "";
    //Hides Previous Pokedex Entries
    let dexSection2 = document.getElementById("pokedex-2");
    dexSection2.innerHTML = null;
    //Generate Random Pokemon!
    let randomPokemonTwo = arrayOfPokemon.results[Math.floor(Math.random() * 700)];
    console.log(randomPokemonTwo);
    console.log(randomPokemonTwo.url);
    fetch (randomPokemonTwo.url)
    .then(response => response.json())
    .then(pokemon => pokeInfoArray2 = pokemon)
    setTimeout(function() {
        console.log(pokeInfoArray2)
        console.log("Pokemon number is " + pokeInfoArray2.id);
    }, 1000)
    let secondPokemon = document.getElementById('second-pokemon-section');
    secondPokemon.innerHTML = null;
    setTimeout(function() {
        const li = document.createElement('li');
        const img = document.createElement('img');
        const ul = document.createElement('ul');
        const name = document.createTextNode(`${capitalize(pokeInfoArray2.name)}`)
        const type1 = document.createTextNode(`${capitalize(pokeInfoArray2.types[0]["type"]["name"])}`)
        // img.src = pokeInfoArray1.sprites.front_default
        img.src = pokeInfoArray2["sprites"]["other"]['official-artwork']["front_default"];
        secondPokemon.appendChild(img)
        li.appendChild(name)
        li.appendChild(ul)
        ul.appendChild(type1)
        if (pokeInfoArray2.types[1] !== undefined) {
            const ul = document.createElement('ul');
            const type2 = document.createTextNode(`${capitalize(pokeInfoArray2.types[1]["type"]["name"])}`)
            li.append(type2)
            ul.append(li)
        };
        //Generate Pokedex Entries!
        let dexSection2 = document.getElementById("pokedex-2");
        const button = document.createElement('button');
        button.innerHTML = "Pokédex Entry"
        const ul2 = document.createElement('ul');
        console.log("HERE")
        dexSection2.append(button)
        button.addEventListener('click', () => {
            dexSection2.innerHTML = null;
            let pokeNumberTwo = pokeInfoArray2.id;
            fetch (pokedexPortal["pokemon_entries"][pokeNumberTwo-1]["pokemon_species"]["url"])
            .then(response => response.json())
            .then(pokemon => pokedex2Array = pokemon)
            setTimeout(function() {
                console.log(pokedex2Array)
                const li = document.createElement('ul');
                let text = document.createTextNode(`${pokedex2Array["flavor_text_entries"][0]["flavor_text"]}`);
                console.log(text);
                dexSection2.appendChild(text);
                dexSection2.appendChild(li);
            }, 1000)
        })
        secondPokemon.append(li)
    }, 1000)
};

//Battle Button! This is now a VS Image. Updating to hide button
document.getElementById("battle-button").style.visibility = "hidden";
const pokemonBattle = () => {
    //Hide Previous Winner and Loser
    document.getElementById("first-result").innerHTML = "";
    document.getElementById("second-result").innerHTML = "";
    //Fetch Type 1 of Pokemon 1
    fetch (pokeInfoArray1.types[0].type.url)
    .then(response => response.json())
    .then(pokemon => poke1Type1Array = pokemon)
    //Fetch Type 2 of Pokemon 1
    if (pokeInfoArray1.types[1] !== undefined) {
        fetch (pokeInfoArray1.types[1].type.url)
        .then(response => response.json())
        .then(pokemon => poke1Type2Array = pokemon)
    }
    //Fetch Type 1 of Pokemon 2
    fetch (pokeInfoArray2.types[0].type.url)
    .then(response => response.json())
    .then(pokemon => poke2Type1Array = pokemon)
    //Fetch Type 2 of Pokemon 2
    if (pokeInfoArray2.types[1] !== undefined) {
        fetch (pokeInfoArray2.types[1].type.url)
        .then(response => response.json())
        .then(pokemon => poke2Type2Array = pokemon)
    }
    //Log Damage Relationships
    setTimeout(function() {
        console.log(poke1Type1Array['damage_relations'])
        console.log(poke2Type1Array['damage_relations'])
    }, 1000)

    //Type 1 VS Type 1
    //First Pokemon Double Damage Determiner
    const doubleDamage = () => {
        //Move values into an array for far easier comparison
        let superArray = poke1Type1Array['damage_relations']['double_damage_to'].map(({ name }) => name);
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
    //Second Pokemon Double Damage Determiner
    const secondDoubleDamage = () => {
        let superArray = poke2Type1Array['damage_relations']['double_damage_to'].map(({ name }) => name);
        if (poke2Type1Array['damage_relations']['double_damage_to'].length === 0) {
            console.log("Not Super Effective");
            console.log("theFirstOne");
            return false;
        } else {
            if (superArray.includes(poke1Type1Array['name'])) {
                console.log('Super Effective!');
                return true;
            } else {
                console.log('Else');
                console.log("Not Super Effective");
                return false;
            }
        }
    }

    //First Pokemon Damage Resistance Determiner
    const damageResistance = () => {
        //Move values into an array for far easier comparison
        let resistanceArray = poke1Type1Array['damage_relations']['half_damage_from'].map(({ name }) => name);
        if (poke1Type1Array['damage_relations']['half_damage_from'].length === 0) {
            console.log("Not Resistant");
            console.log("Not Resistant theFirstOne");
            return false;
        } else {
            if (resistanceArray.includes(poke2Type1Array['name'])) {
                console.log('Resists!');
                return true;
            } else {
                console.log('Not Resistant Else');
                console.log("Not Resistant");
                return false;
            }
        }
    }

    //Second Pokemon Resistance Determiner
    const secondDamageResistance = () => {
        //Move values into an array for far easier comparison
        let resistanceArray = poke2Type1Array['damage_relations']['half_damage_from'].map(({ name }) => name);
        if (poke2Type1Array['damage_relations']['half_damage_from'].length === 0) {
            console.log("Not Resistant");
            console.log("Not Resistant theFirstOne");
            return false;
        } else {
            if (resistanceArray.includes(poke1Type1Array['name'])) {
                console.log('Resists!');
                return true;
            } else {
                console.log('Not Resistant Else');
                console.log("Not Resistant");
                return false;
            }
        }
    }

    //First Pokemon Damage Immune Determiner
    const damageImmune = () => {
        //Move values into an array for far easier comparison
        let immuneArray = poke1Type1Array['damage_relations']['no_damage_from'].map(({ name }) => name);
        if (poke1Type1Array['damage_relations']['no_damage_from'].length === 0) {
            console.log("Not Immune");
            console.log("NI theFirstOne");
            return false;
        } else {
            if (immuneArray.includes(poke2Type1Array['name'])) {
                console.log('Immune!');
                return true;
            } else {
                console.log('NI Else');
                console.log("Not Immune");
                return false;
            }
        }
    }

    //Second Pokemon Damage Immune Determiner
    const secondDamageImmune = () => {
        //Move values into an array for far easier comparison
        let immuneArray = poke2Type1Array['damage_relations']['no_damage_from'].map(({ name }) => name);
        if (poke2Type1Array['damage_relations']['no_damage_from'].length === 0) {
            console.log("Not Immune");
            console.log("NI theFirstOne");
            return false;
        } else {
            if (immuneArray.includes(poke1Type1Array['name'])) {
                console.log('Immune!');
                return true;
            } else {
                console.log('NI Else');
                console.log("Not Immune");
                return false;
            }
        }
    }


    //Damage Determiners for the Second Type! Second Type VS Second Type
    //First Pokemon Double Damage Determiner
    const doubleDamage2 = () => {
        //Move values into an array for far easier comparison
        let superArray = poke1Type2Array['damage_relations']['double_damage_to'].map(({ name }) => name);
        if (poke1Type2Array['damage_relations']['double_damage_to'].length === 0) {
            console.log("Not Super Effective");
            console.log("theFirstOne");
            return false;
        } else {
            if (superArray.includes(poke2Type2Array['name'])) {
                console.log('Super Effective!');
                return true;
            } else {
                console.log('Else');
                console.log("Not Super Effective");
                return false;
            }
        }
    }

     //Second Pokemon Double Damage Determiner
    const secondDoubleDamage2 = () => {
    //Move values into an array for far easier comparison
    let superArray = poke2Type2Array['damage_relations']['double_damage_to'].map(({ name }) => name);
        if (poke2Type2Array['damage_relations']['double_damage_to'].length === 0) {
            console.log("Not Super Effective");
            console.log("theFirstOne");
            return false;
        } else {
            if (superArray.includes(poke1Type2Array['name'])) {
                console.log('Super Effective!');
                return true;
            } else {
                console.log('Else');
                console.log("Not Super Effective");
                return false;
            }
        }
    }
    
     //First Pokemon Damage Resistance Determiner
    const damageResistance2 = () => {
        //Move values into an array for far easier comparison
        let resistanceArray = poke1Type2Array['damage_relations']['half_damage_from'].map(({ name }) => name);
        if (poke1Type2Array['damage_relations']['half_damage_from'].length === 0) {
            console.log("Not Resistant");
            console.log("Not Resistant theFirstOne");
            return false;
        } else {
            if (resistanceArray.includes(poke2Type2Array['name'])) {
                console.log('Resists!');
                return true;
            } else {
                console.log('Not Resistant Else');
                console.log("Not Resistant");
                return false;
            }
        }
    }

    //Second Pokemon Second Type Damage Resistance Determiner
    const secondDamageResistance2 = () => {
        //Move values into an array for far easier comparison
        let resistanceArray = poke2Type2Array['damage_relations']['half_damage_from'].map(({ name }) => name);
        if (poke2Type2Array['damage_relations']['half_damage_from'].length === 0) {
            console.log("Not Resistant");
            console.log("Not Resistant theFirstOne");
            return false;
        } else {
            if (resistanceArray.includes(poke1Type2Array['name'])) {
                console.log('Resists!');
                return true;
            } else {
                console.log('Not Resistant Else');
                console.log("Not Resistant");
                return false;
            }
        }
    }
    
    //First Pokemon Damage Immune Determiner
    const damageImmune2 = () => {
        //Move values into an array for far easier comparison
        let immuneArray = poke1Type2Array['damage_relations']['no_damage_from'].map(({ name }) => name);
        if (poke1Type2Array['damage_relations']['no_damage_from'].length === 0) {
            console.log("Not Immune");
            console.log("NI theFirstOne");
            return false;
        } else {
            if (immuneArray.includes(poke2Type2Array['name'])) {
                console.log('Immune!');
                return true;
            } else {
                console.log('NI Else');
                console.log("Not Immune");
                return false;
            }
        }
    }

    //Second Pokemon Second Type Damage Immune Determiner
    const secondDamageImmune2 = () => {
        //Move values into an array for far easier comparison
        let immuneArray = poke2Type2Array['damage_relations']['no_damage_from'].map(({ name }) => name);
        if (poke2Type2Array['damage_relations']['no_damage_from'].length === 0) {
            console.log("Not Immune");
            console.log("NI theFirstOne");
            return false;
        } else {
            if (immuneArray.includes(poke1Type2Array['name'])) {
                console.log('Immune!');
                return true;
            } else {
                console.log('NI Else');
                console.log("Not Immune");
                return false;
            }
        }
    }


    //Damage Determiners for the First Type VS Second Type
    //First Pokemon Double Damage Determiner
    const doubleDamage3 = () => {
        //Move values into an array for far easier comparison
        let superArray = poke1Type1Array['damage_relations']['double_damage_to'].map(({ name }) => name);
        if (poke1Type1Array['damage_relations']['double_damage_to'].length === 0) {
            console.log("Not Super Effective");
            console.log("theFirstOne");
            return false;
        } else {
            if (superArray.includes(poke2Type2Array['name'])) {
                console.log('Super Effective!');
                return true;
            } else {
                console.log('Else');
                console.log("Not Super Effective");
                return false;
            }
        }
    }

    //Second Pokemon Double Damage Determiner
    const secondDoubleDamage3 = () => {
        //Move values into an array for far easier comparison
        let superArray = poke2Type1Array['damage_relations']['double_damage_to'].map(({ name }) => name);
        if (poke2Type1Array['damage_relations']['double_damage_to'].length === 0) {
            console.log("Not Super Effective");
            console.log("theFirstOne");
            return false;
        } else {
            if (superArray.includes(poke1Type2Array['name'])) {
                console.log('Super Effective!');
                return true;
            } else {
                console.log('Else');
                console.log("Not Super Effective");
                return false;
            }
        }
    }
    
    //First Pokemon Damage Resistance Determiner
    const damageResistance3 = () => {
        //Move values into an array for far easier comparison
        let resistanceArray = poke1Type1Array['damage_relations']['half_damage_from'].map(({ name }) => name);
        if (poke1Type1Array['damage_relations']['half_damage_from'].length === 0) {
            console.log("Not Resistant");
            console.log("Not Resistant theFirstOne");
            return false;
        } else {
            if (resistanceArray.includes(poke2Type2Array['name'])) {
                console.log('Resists!');
                return true;
            } else {
                console.log('Not Resistant Else');
                console.log("Not Resistant");
                return false;
            }
        }
    }

    //Second Pokemon Damage Resistance Determiner
    const secondDamageResistance3 = () => {
        //Move values into an array for far easier comparison
        let resistanceArray = poke2Type1Array['damage_relations']['half_damage_from'].map(({ name }) => name);
        if (poke2Type1Array['damage_relations']['half_damage_from'].length === 0) {
            console.log("Not Resistant");
            console.log("Not Resistant theFirstOne");
            return false;
        } else {
            if (resistanceArray.includes(poke1Type2Array['name'])) {
                console.log('Resists!');
                return true;
            } else {
                console.log('Not Resistant Else');
                console.log("Not Resistant");
                return false;
            }
        }
    }
    
    //First Pokemon Damage Immune Determiner
    const damageImmune3 = () => {
        //Move values into an array for far easier comparison
        let immuneArray = poke1Type1Array['damage_relations']['no_damage_from'].map(({ name }) => name);
        if (poke1Type1Array['damage_relations']['no_damage_from'].length === 0) {
            console.log("Not Immune");
            console.log("NI theFirstOne");
            return false;
        } else {
            if (immuneArray.includes(poke2Type2Array['name'])) {
                console.log('Immune!');
                return true;
            } else {
                console.log('NI Else');
                console.log("Not Immune");
                return false;
            }
        }
    }

    //Second Pokemon Damage Immune Determiner
    const secondDamageImmune3 = () => {
        //Move values into an array for far easier comparison
        let immuneArray = poke2Type1Array['damage_relations']['no_damage_from'].map(({ name }) => name);
        if (poke2Type1Array['damage_relations']['no_damage_from'].length === 0) {
            console.log("Not Immune");
            console.log("NI theFirstOne");
            return false;
        } else {
            if (immuneArray.includes(poke1Type2Array['name'])) {
                console.log('Immune!');
                return true;
            } else {
                console.log('NI Else');
                console.log("Not Immune");
                return false;
            }
        }
    }


    //Damage Determiners for the Second Type VS First Type
    //First Pokemon Double Damage Determiner
    const doubleDamage4 = () => {
        //Move values into an array for far easier comparison
        let superArray = poke1Type2Array['damage_relations']['double_damage_to'].map(({ name }) => name);
        if (poke1Type2Array['damage_relations']['double_damage_to'].length === 0) {
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

    //Second Pokemon Double Damage Determiner
    const secondDoubleDamage4 = () => {
        //Move values into an array for far easier comparison
        let superArray = poke2Type2Array['damage_relations']['double_damage_to'].map(({ name }) => name);
        if (poke2Type2Array['damage_relations']['double_damage_to'].length === 0) {
            console.log("Not Super Effective");
            console.log("theFirstOne");
            return false;
        } else {
            if (superArray.includes(poke1Type1Array['name'])) {
                console.log('Super Effective!');
                return true;
            } else {
                console.log('Else');
                console.log("Not Super Effective");
                return false;
            }
        }
    }
    
    //First Pokemon Damage Resistance Determiner
    const damageResistance4 = () => {
        //Move values into an array for far easier comparison
        let resistanceArray = poke1Type2Array['damage_relations']['half_damage_from'].map(({ name }) => name);
        if (poke1Type2Array['damage_relations']['half_damage_from'].length === 0) {
            console.log("Not Resistant");
            console.log("Not Resistant theFirstOne");
            return false;
        } else {
            if (resistanceArray.includes(poke2Type1Array['name'])) {
                console.log('Resists!');
                return true;
            } else {
                console.log('Not Resistant Else');
                console.log("Not Resistant");
                return false;
            }
        }
    }

    //Second Pokemon Damage Resistance Determiner
    const secondDamageResistance4 = () => {
        //Move values into an array for far easier comparison
        let resistanceArray = poke2Type2Array['damage_relations']['half_damage_from'].map(({ name }) => name);
        if (poke2Type2Array['damage_relations']['half_damage_from'].length === 0) {
            console.log("Not Resistant");
            console.log("Not Resistant theFirstOne");
            return false;
        } else {
            if (resistanceArray.includes(poke1Type1Array['name'])) {
                console.log('Resists!');
                return true;
            } else {
                console.log('Not Resistant Else');
                console.log("Not Resistant");
                return false;
            }
        }
    }
    
    //First Pokemon Damage Immune Determiner
    const damageImmune4 = () => {
        //Move values into an array for far easier comparison
        let immuneArray = poke1Type2Array['damage_relations']['no_damage_from'].map(({ name }) => name);
        if (poke1Type2Array['damage_relations']['no_damage_from'].length === 0) {
            console.log("Not Immune");
            console.log("NI theFirstOne");
            return false;
        } else {
            if (immuneArray.includes(poke2Type1Array['name'])) {
                console.log('Immune!');
                return true;
            } else {
                console.log('NI Else');
                console.log("Not Immune");
                return false;
            }
        }
    }

    //Second Pokemon Damage Immune Determiner
    const secondDamageImmune4 = () => {
        //Move values into an array for far easier comparison
        let immuneArray = poke2Type2Array['damage_relations']['no_damage_from'].map(({ name }) => name);
        if (poke2Type2Array['damage_relations']['no_damage_from'].length === 0) {
            console.log("Not Immune");
            console.log("NI theFirstOne");
            return false;
        } else {
            if (immuneArray.includes(poke1Type1Array['name'])) {
                console.log('Immune!');
                return true;
            } else {
                console.log('NI Else');
                console.log("Not Immune");
                return false;
            }
        }
    }



    //Determine the Winner!
    setTimeout(function() {
        const firstPlayer = document.getElementById('first-result');
        const secondPlayer = document.getElementById('second-result');
        const banner = document.createElement('H1');
        const bannerTwo = document.createElement('H1');
        const winner = document.createTextNode(` Winner! `);
        const loser = document.createTextNode(` Loser.`);
        const tie = document.createTextNode(` Tie! `);
        const tie2 = document.createTextNode(` Tie! `);
        let pokeBattleArray1 = [];
        let pokeBattleArray2 = [];



        //First Pokemon Type 1 VS Second Pokemon Type 1
        damageImmune();
        if (damageImmune() === true) {
            pokeBattleArray1.push(true);
        }

        secondDamageImmune();
        if (secondDamageImmune() === true) {
            pokeBattleArray2.push(true);
        }

        doubleDamage();
        if (doubleDamage() === true) {
            pokeBattleArray1.push(true);
        }

        secondDoubleDamage();
        if (secondDoubleDamage() === true) {
            pokeBattleArray2.push(true);
        }

        damageResistance();
        if (damageResistance() === true) {
            pokeBattleArray1.push(true);
        }

        secondDamageResistance();
        if (secondDamageResistance() === true) {
            pokeBattleArray2.push(true);
        }

        
        //First Pokemon Type 2 VS Second Pokemon Type 2
        if (pokeInfoArray1.types[1] !== undefined && pokeInfoArray2.types[1] !== undefined) {
            damageImmune2();
            if (damageImmune2() === true) {
                pokeBattleArray1.push(true);
            }

            secondDamageImmune2();
            if (secondDamageImmune2() === true) {
                pokeBattleArray2.push(true);
            }
    
            doubleDamage2();
            if (doubleDamage2() === true) {
                pokeBattleArray1.push(true);
            }

            secondDoubleDamage2();
            if (secondDoubleDamage2() === true) {
                pokeBattleArray2.push(true);
            }
    
            damageResistance2();
            if (damageResistance2() === true) {
                pokeBattleArray1.push(true);
            }

            secondDamageResistance2();
            if (secondDamageResistance2() === true) {
                pokeBattleArray2.push(true);
            }
        }


        //First Pokemon Type 1 VS Second Pokemon Type 2
        if (pokeInfoArray2.types[1] !== undefined) {
            damageImmune3();
            if (damageImmune3() === true) {
                pokeBattleArray1.push(true);
            }
    
            doubleDamage3();
            if (doubleDamage3() === true) {
                pokeBattleArray1.push(true);
            }
    
            damageResistance3();
            if (damageResistance3() === true) {
                pokeBattleArray1.push(true);
            }
        }

        //Second Pokemon Type 1 VS First Pokemon Type 2
        if (pokeInfoArray1.types[1] !== undefined) {
            secondDamageImmune3();
            if (secondDamageImmune3() === true) {
                pokeBattleArray2.push(true);
            }

            secondDoubleDamage3();
            if (secondDoubleDamage3() === true) {
                pokeBattleArray2.push(true);
            }

            secondDamageResistance3();
            if (secondDamageResistance3() === true) {
                pokeBattleArray2.push(true);
            }
        }


        //First Pokemon Type 2 VS Second Pokemon Type 1
        if (pokeInfoArray1.types[1] !== undefined) {
            damageImmune4();
            if (damageImmune4() === true) {
                pokeBattleArray1.push(true);
            }
    
            doubleDamage4();
            if (doubleDamage4() === true) {
                pokeBattleArray1.push(true);
            }
    
            damageResistance4();
            if (damageResistance4() === true) {
                pokeBattleArray1.push(true);
            }
        }

        //Second Pokemon Type 2 VS First Pokemon Type 1
        if (pokeInfoArray2.types[1] !== undefined) {

            secondDamageImmune4();
            if (secondDamageImmune4() === true) {
                pokeBattleArray2.push(true);
            }

            secondDoubleDamage4();
            if (secondDoubleDamage4() === true) {
                pokeBattleArray2.push(true);
            }

            secondDamageResistance4();
            if (secondDamageResistance4() === true) {
                pokeBattleArray1.push(true);
            }
        }

        console.log(pokeBattleArray1);
        console.log(pokeBattleArray2);
    
        if (pokeBattleArray1.length > pokeBattleArray2.length) {
            banner.appendChild(winner)
            firstPlayer.append(banner);
    
            bannerTwo.appendChild(loser)
            secondPlayer.append(bannerTwo);
        } else if (pokeBattleArray1.length < pokeBattleArray2.length) {
            banner.appendChild(loser)
            firstPlayer.append(banner);
    
            bannerTwo.appendChild(winner)
            secondPlayer.append(bannerTwo);
        } else if (pokeBattleArray1.length === pokeBattleArray2.length) {
            banner.appendChild(tie)
            firstPlayer.append(banner);
    
            bannerTwo.appendChild(tie2)
            secondPlayer.append(bannerTwo);
        }



        //Play sound effect
        let audio = new Audio('WIN A BATTLE POKEMON - SOUND EFFECT.mp3')
        audio.play();

    }, 1000)
};


//TESTING! HOORAY!

const assert = require('assert');

describe('getPokemon', () => {
    it('calls fetch with the correct url', () => {
        const fakeFetch = url => {
            assert(
                url ===
                'https://pokeapi.co/api/v2/pokemon'
            )
            return new Promise(function(resolve) {
            })
        }
        setTimeout(function() {
            getPokemon(fakeFetch)
        }, 1000)
    })
})