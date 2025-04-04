const abilitiesUL = document.getElementById("abilities");
const imageContainer = document.getElementById("imageContainer");
const monsterSelect = document.getElementById("SelectMonster");
const selectPokemonDiv = document.getElementById('SelectPokemon');
const slotsDiv = document.getElementById('SlotsDiv');
const slot1Container = document.getElementById("Slot1Selection");
const slot2Container = document.getElementById("Slot2Selection");
const slot1Btn = document.getElementById("Slot1Btn");
const slot2Btn = document.getElementById("Slot2Btn");
const backBtn = document.getElementById("BackButton");
const selectBtn = document.getElementById("SelectButton");
const selectDiv = document.getElementById("SelectDiv");
 
const typeDiv = document.getElementById('type-stats');
const statsContainer = document.createElement("div"); // New container for stats
statsContainer.id = "statsContainer";
statsContainer.className = "container"
typeDiv.appendChild(statsContainer); // Append it to the body (or place it elsewhere)


let slotNumber = {};
let currentImage = {};

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
  currentImage = sprites.front_default; //testing !!!!!!
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

function showSelect1Image(){
  let image = document.createElement("img");
  image.src = currentImage;
  slot1Container.appendChild(image);
  console.slot1Container;
}
function showSelect2Image(){
  let image = document.createElement("img");
  image.src = currentImage;
  slot2Container.appendChild(image);
}
monsterSelect.addEventListener("change", event => {
  GetOneMonster(event.target.value);
});

slot1Btn.addEventListener("click", (event) => {
    slotNumber = event.target.value;
    selectPokemonDiv.style.visibility = 'visible';
    statsContainer.style.visibility = 'visible';
    statsContainer.innerHTML = "";
    /*slot1Container.innerHTML = '';*/
    slotsDiv.style.visibility = 'hidden';
    selectDiv.style.visibility = 'visible';
    
})

slot2Btn.addEventListener("click", (event) => {
  slotNumber = event.target.value;
  selectPokemonDiv.style.visibility = 'visible';
  statsContainer.style.visibility = 'visible';
  imageContainer.innerHTML = "";
  statsContainer.innerHTML = "";
  /*slot2Container.innerHTML = '';*/
  slotsDiv.style.visibility = 'hidden';
})

backBtn.addEventListener("click", (event) => {
  if(event.target.value == 'Home'){
    selectPokemonDiv.style.visibility = 'hidden';
    statsContainer.style.visibility = 'hidden';
    /*slot1Btn.style.visibility = 'visible';
    slot2Btn.style.visibility = 'visible';*/
    slotsDiv.style.visibility = 'visible';
    imageContainer.innerHTML = "";
    statsContainer.innerHTML = ""; 
    slot1Container.innerHTML = '';
    slot2Container.innerHTML = '';
    selectDiv.style.visibility = 'hidden';
    slotNumber = {};
  }
})

selectBtn.addEventListener("click", () => {
   
  if(slotNumber == '1'){    
     showSelect1Image();
     slotsDiv.style.visibility = 'visible';
  }
  else if(slotNumber == '2'){
    showSelect2Image();
    slotsDiv.style.visibility = 'visible';
  }
  
  
})
