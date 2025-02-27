let vehicles = [
  { make: "Tesla", model: "Model S", type: "Sedan", color: "Red", tire: "All-season" },
  { make: "Ford", model: "Mustang", type: "Coupe", color: "Blue", tire: "Performance" },
  { make: "Honda", model: "Civic", type: "Hatchback", color: "Black", tire: "All-season" },
  { make: "Chevrolet", model: "Silverado", type: "Truck", color: "White", tire: "Off-road" },
  { make: "BMW", model: "X5", type: "SUV", color: "Silver", tire: "All-terrain" },
  { make: "Audi", model: "A4", type: "Sedan", color: "Grey", tire: "All-season" },
  { make: "Nissan", model: "Altima", type: "Sedan", color: "Blue", tire: "Performance" },
  { make: "Subaru", model: "Outback", type: "Wagon", color: "Green", tire: "All-terrain" },
  { make: "Mercedes-Benz", model: "GLC", type: "SUV", color: "White", tire: "All-season" },
  { make: "Toyota", model: "Camry", type: "Sedan", color: "Gold", tire: "All-season" },
  { make: "Dodge", model: "Charger", type: "Sedan", color: "Yellow", tire: "Performance" },
  { make: "Hyundai", model: "Sonata", type: "Sedan", color: "Black", tire: "All-season" },
  { make: "Jeep", model: "Wrangler", type: "SUV", color: "Red", tire: "Off-road" },
  { make: "Kia", model: "Sorento", type: "SUV", color: "Blue", tire: "All-terrain" },
  { make: "Volkswagen", model: "Jetta", type: "Sedan", color: "Silver", tire: "All-season" },
  { make: "Ferrari", model: "488 GTB", type: "Coupe", color: "Red", tire: "Performance" },
  { make: "Lexus", model: "RX 350", type: "SUV", color: "Brown", tire: "All-season" },
  { make: "Porsche", model: "911", type: "Coupe", color: "Black", tire: "Performance" },
  { make: "Cadillac", model: "Escalade", type: "SUV", color: "White", tire: "All-season" },
  { make: "Acura", model: "MDX", type: "SUV", color: "Green", tire: "All-terrain" }
];

const carSelectorElement = document.getElementById("CarSelector");
const makeModelDisplay = document.getElementById('MakeModel');
const carDetailsElement = document.getElementById("CarDetails");

carSelectorElement.innerHTML = "";

for(i = 0; i < vehicles.length; i++){
   
    let option = document.createElement("option");
    option.text = vehicles[i].model;
    option.value = i; 
    carSelectorElement.appendChild(option);
}

carSelectorElement.addEventListener("change", (event) =>{

    carDetailsElement.innerHTML = " ";
    let message = vehicles[event.target.value].make + " " + vehicles[event.target.value].model;
    makeModelDisplay.innerHTML = message;
    let type = document.createElement("li");
    type.innerHTML = vehicles[event.target.value].type;
    carDetailsElement.appendChild(type);
    type = document.createElement("li");
    type.innerHTML = vehicles[event.target.value].color;
    carDetailsElement.appendChild(type);
    type = document.createElement("li");
    type.innerHTML = vehicles[event.target.value].tire;
    carDetailsElement.appendChild(type);
    
});

const searchButton = document.getElementById("searchButton");
const getModel = document.getElementById("carModel");

/*This function  */
function getCarModel(){
  for (let key in vehicles) {

    if(vehicles[key].model == getModel.value){
      carDetailsElement.innerHTML = " ";
      message = vehicles[key].make + " " + vehicles[key].model;
      makeModelDisplay.innerHTML = message;
      let type = document.createElement("li");
      type.innerHTML = vehicles[key].type;
      carDetailsElement.appendChild(type);
      type = document.createElement("li");
      type.innerHTML = vehicles[key].color;
      carDetailsElement.appendChild(type);
      type = document.createElement("li");
      type.innerHTML = vehicles[key].tire;
      carDetailsElement.appendChild(type);  
      break;
    }
    else{
      message = "Model is not found.";
      makeModelDisplay.innerHTML = message;
      carDetailsElement.innerHTML = '';
    }
  }
}

searchButton.addEventListener("click", getCarModel);