
function getName(){

  const getPokemonName = document.getElementById('pokemon_name').value.toLowerCase();
  const getPicture = document.getElementById('picture');

  fetch(`https://pokeapi.co/api/v2/pokemon/${getPokemonName}`)
  .then(response => response.json())
  .then(data => {
    // Log abilities
    console.log(data.sprites);

    // Set the picture src to the Pokémon's image
    getPicture.src = data.sprites.front_default;  // Sets the image from the sprite URL
  })
  .catch(error => console.error("Error fetching data:", error));

}


  
 