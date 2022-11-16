//IIFE to protect the pokemon list, with key functions
let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: 'Bulbasaur',
      height: 4,
      type: ['grass', 'poison']
    },
    {
      name: 'Pikachu',
      height: 3,
      type: ['electric']
    },
    {
      name: 'Charmander',
      height: 4,
      type: ['fire']
    }
  ];

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
  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

//This forEach loop references within the IIFE andcalls the addListItem function
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});