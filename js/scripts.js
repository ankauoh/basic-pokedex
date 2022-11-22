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
    button.innerText = pokemon.name;
    button.classList.add("primary-button");
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

  function showModal(pokemon) {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerText = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let title = document.createElement('h1');
    title.innerText = pokemon.name;

    let pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.imageUrl;

    let pokemonHeight = document.createElement('p');
    pokemonHeight.innerText = "Height: " + pokemon.height;

    let pokemonTypes = document.createElement('p');
    pokemonTypes.innerText = "Type: " + pokemon.types;

    modal.appendChild(title);
    modal.appendChild(pokemonImage);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonTypes);
    modalContainer.appendChild(modal);

    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    })

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    let modalContainer = document.querySelector('.modal-container');
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('.modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

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