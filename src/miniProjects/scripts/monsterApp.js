const abilitiesUL = document.getElementById("abilities");
const imageContainer = document.getElementById("imageContainer");
const monsterSelect = document.getElementById("SelectMonster");
const statsContainer = document.createElement("div"); // New container for stats
statsContainer.id = "statsContainer";
document.body.appendChild(statsContainer); // Append it to the body (or place it elsewhere)

function GetOneMonster(monster) {
  fetch("https://pokeapi.co/api/v2/pokemon/" + monster)
    .then(response => response.json()) // Convert response to JSON
    .then(data => {
      //BuildAbilitiesList(data.abilities);
      ShowSelectionImages(data.sprites);
      DisplayStatsAndTypes(data.types, data.stats);
    }) // Log the data
    .catch(error => console.error("Error:", error)); // Catch and log any errors
}

fetch("https://pokeapi.co/api/v2/pokemon/")
  .then(response => response.json()) // Convert response to JSON
  .then(data => BuildMonsterSelectOptions(data.results)) // Populate dropdown
  .catch(error => console.error("Error:", error)); // Catch and log any

function BuildAbilitiesList(abilities) {
  abilitiesUL.innerHTML = "";
  abilities.forEach(element => {
    let li = document.createElement("li");
    li.innerHTML = element.ability.name;
    abilitiesUL.appendChild(li);
  });
}

function ShowSelectionImages(sprites) {
  imageContainer.innerHTML = "";
  let image = document.createElement("img");
  image.src = sprites.front_default;
  imageContainer.appendChild(image);
}

function DisplayStatsAndTypes(types, stats) {
  statsContainer.innerHTML = ""; // Clear previous stats

  // Display Types
  let typesHeader = document.createElement("h3");
  typesHeader.textContent = "Type(s):";
  statsContainer.appendChild(typesHeader);

  let typesList = document.createElement("ul");
  types.forEach(type => {
    let typeItem = document.createElement("li");
    typeItem.textContent = type.type.name;
    typesList.appendChild(typeItem);
  });
  statsContainer.appendChild(typesList);

  // Display Base Stats
  let statsHeader = document.createElement("h3");
  statsHeader.textContent = "Base Stats:";
  statsContainer.appendChild(statsHeader);

  let statsList = document.createElement("ul");
  stats.forEach(stat => {
    let statItem = document.createElement("li");
    statItem.textContent = `${stat.stat.name.toUpperCase()}: ${stat.base_stat}`;
    statsList.appendChild(statItem);
  });
  statsContainer.appendChild(statsList);
}

function BuildMonsterSelectOptions(monsterOptions) {
  monsterOptions.forEach(element => {
    let option = document.createElement("option");
    option.innerHTML = element.name;
    option.value = element.name;
    monsterSelect.appendChild(option);
  });
}

monsterSelect.addEventListener("change", event => {
  GetOneMonster(event.target.value);
});
