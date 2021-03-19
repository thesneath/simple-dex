let pokemonRepository = (function() {
    let pokemonList = [
        {
            name: 'Bulbasaur',
            height: 2.33,
            type: ['Grass', 'Poison']
        },
        {
            name: 'Charmander',
            height: 2,
            type: ['Fire']
        },
        {
            name: 'Squirtle',
            height: 1.67,
            type: ['Water']
        },
        {
            name: 'Pikachu',
            height: 1.33,
            type: ['Electric']
        },
        {
            name: 'Eevee',
            height: 1,
            type: ['Normal']
        },
        {
            name: 'Dragonite',
            height: 7.25,
            type: ['Dragon', 'Flying']
        } 
    ];

    function add(pokemon){
        pokemonList.push(pokemon);
    }

    function getAll(){
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };
})();

// this loops through the pokemonList array and prints a <div> to the DOM containing: "'pokemon name' (height: 'height')" 

document.write("<div class=\"text\">");

pokemonRepository.getAll().forEach(pokemon => {
    if(pokemon.height > 5){
        document.write(`<p>${pokemon.name} (height: ${pokemon.height}) - Crikey, look at the size of this one! <p>`)
    } else {
        document.write(`<p> ${pokemon.name} (height: ${pokemon.height})<p>`)
    }
});

document.write("</div>");
