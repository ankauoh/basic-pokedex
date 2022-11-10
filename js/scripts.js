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
//The code below runs a loop to list the names and heights of the pokemon
// VSCode recommended using template literals instead of the quotes I was using

for (let i = 0; i < pokemonList.length; i++) {
  //opening <p> tag, so the iteration is formatted in html
  document.write('<p>');

  if (pokemonList[i].height <= 3)
    document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) `);
  else {
    document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow, that's big! `);
  }
  //closing </p> tag so the iteration is html valid
  document.write('</p>');

}