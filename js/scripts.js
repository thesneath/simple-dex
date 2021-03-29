let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    // adds pokemon to list 
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    // returns list of pokemon 
    function getAll(){
        return pokemonList;
    }

    // creates and displays a list of clickable pokemon objects 
    function addListItem(pokemon){
        let pokemonUl = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        listItem.classList.add('group-list-item')

        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button');
        button.classList.add('btn');
        button.classList.add('col');
        button.setAttribute('data-bs-target', '#pokeModal')
        button.setAttribute('data-bs-toggle', 'modal')
        button.type = "button";
        
        listItem.appendChild(button);
        pokemonUl.appendChild(listItem);
 
        addDetailsListener(button, pokemon);

    }
 
    // event listener for showDetails
    function addDetailsListener(button, pokemon) {
        button.addEventListener('click', function(){
            showDetails(pokemon);
        })
    }

    // Opens modal with pokemon info
    function showDetails(pokemon){
        loadDetails(pokemon).then(function(){
            showModal(pokemon);
        });
    }

    // fetch pokemon from PokeApi
    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
      }

    // load details from PokeApi 
    function loadDetails(pokemon){
        let url = pokemon.detailsUrl;
        return fetch(url).then(function(response){
            return response.json();
        }).then(function(details){
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types;
        }).catch(function(e){
            console.error(e);
        })
    }

    // show and hidemodal functions

    function showModal(pokemon) {
        let modalBody = document.querySelector('.modal-body');
        let modalTitle = document.querySelector('.modal-title');

        modalTitle.innerText = '';
        modalBody.innerText = '';

        let nameElement = document.createElement('h1');
        nameElement.innerText = pokemon.name;

        let imageElement = document.createElement('img');
        imageElement.classList.add('modal-img');
        imageElement.style = "width: 40%";
        imageElement.src = pokemon.imageUrl;
        let heightElement = document.createElement('p');
        heightElement.innerText = `Height: ${pokemon.height}`;

        let typesContainer = document.createElement('div');
        typesContainer.classList.add('types-container');

        pokemon.types.forEach(type => {
            let typesElement = document.createElement('div');
            let typesText = document.createElement(`p`);
            typesText.innerText = type.type.name;

            typesElement.classList.add('type');  
            typesElement.classList.add(type.type.name);  
            typesElement.appendChild(typesText);
            typesContainer.appendChild(typesElement);
        })
        modalTitle.appendChild(nameElement);
        modalBody.appendChild(typesContainer);
        modalBody.appendChild(heightElement);
        modalBody.appendChild(imageElement);
    }


    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem,
        addDetailsListener: addDetailsListener,
        showDetails: showDetails,
        showModal: showModal,
    }; 
})();

pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(pokemon => {
        pokemonRepository.addListItem(pokemon);
    });
})


