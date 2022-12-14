//IIFE to protect the pokemon list, with key functions
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }
  //addListItem function for listing pokemon details
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    listPokemon.classList.add('col-md-3');
    button.classList.add('btn', 'btn-primary');
    button.innerText = pokemon.name;
    button.dataset.toggle = "modal";
    button.dataset.target = "#modal-container";
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.addEventListener('click', function (ev) {
      showDetails(pokemon); //calls the function below
    });
  }
  //function referenced above to console log the details
  /*function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }*/

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  };

  function loadList() {
    return fetch(apiURL).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsURL: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsURL;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      //add details to the item here
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  let modalContainer = document.querySelector('#modal-container');
  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let pokemonName = $(`<h2>${pokemon.name}</h2>`);
    let pokemonImage = $(`<img src="${pokemon.imageUrl}"/>`);
    let pokemonHeight = $(`<p>Height: ${pokemon.height}</p>`);
    let types = pokemon.types.map(typeObject => {
      return typeObject.type.name;
    });
    let pokemonTypes = $(`<p>Types: ${types}</p>`);


    modalTitle.empty();
    modalBody.empty();

    modalTitle.append(pokemonName);
    modalBody.append(pokemonImage);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonTypes);
  }


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function () {
  //data is loaded
  // loadList calls the repository, but won't render until all the details are returned trhough forEach
  //This forEach loop references within the IIFE andcalls the addListItem function
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});