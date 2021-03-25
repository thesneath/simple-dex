let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
    let modalContainer = document.querySelector('.modal-container');

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

        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button');

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

    // logs pokemon name to console
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
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');
        modalContainer.classList.add('is-visible');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'x';
        closeButtonElement.addEventListener('click', hideModal)

        let nameElement = document.createElement('h2');
        nameElement.innerText = pokemon.name;

        let typesContainer = document.createElement('div');
        typesContainer.classList.add('types-container');

        // creates a div element containing each type and associates the type with a corresponding background collor
        pokemon.types.forEach(type => {
            let typesElement = document.createElement('div');
            let typesText = document.createElement('p');
            typesText.innerText = type.type.name;

            typesElement.classList.add('type');  
            typesElement.classList.add(`${type.type.name}`);  
            typesElement.appendChild(typesText);
            typesContainer.appendChild(typesElement)
        })

        let heightElement = document.createElement('p');
        heightElement.innerText = `Height: ${pokemon.height}`;

        let imgElement = document.createElement('img');
        imgElement.src = pokemon.imageUrl;

        modal.appendChild(closeButtonElement);
        modal.appendChild(nameElement);
        modal.appendChild(typesContainer);
        modal.appendChild(heightElement);
        modal.appendChild(imgElement);
        modalContainer.appendChild(modal);
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', event => {
        if(event.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    })

    modalContainer.addEventListener('click', event => {
        let target = event.target;
        if(target === modalContainer) {
            hideModal();
        }
    })

    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem,
        addDetailsListener: addDetailsListener,
        showDetails: showDetails,
        showModal: showModal,
        hideModal: hideModal
    }; 
})();

pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(pokemon => {
        pokemonRepository.addListItem(pokemon);
    });
})


