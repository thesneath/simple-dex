let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151'

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

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
            console.log(pokemon);
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
    function loadDetails(item){
        let url = item.detailsUrl;
        return fetch(url).then(function(response){
            return response.json();
        }).then(function(details){
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function(e){
            console.error(e);
        })
    }

    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem,
        addDetailsListener: addDetailsListener,
        showDetails: showDetails
    }; 
})();

pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(pokemon => {
        pokemonRepository.addListItem(pokemon);
    });
})


