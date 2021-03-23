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
        if(typeof pokemon === 'Object') {
            pokemonList.push(pokemon);
        } else {
            return 'Please enter using the correct format';
        }
    }

    function getAll(){
        return pokemonList;
    }

    function addListItem(pokemon){
        let pokemonUl = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');

        let button = document.createElement('button');
        button.innerText = pokemon;
        button.classList.add('button');

        listItem.appendChild(button);
        pokemonUl.appendChild(listItem);
    } 

    

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
})();

// this loops through the pokemonList array and prints list to the DOM containing: "'pokemon name' (height: 'height')" 

pokemonRepository.getAll().forEach(pokemon => {
   pokemonRepository.addListItem(pokemon.name);
});


