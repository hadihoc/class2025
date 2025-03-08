 // Get the option element by its IDs
const getSelectedElement = document.getElementById('options');
// Get the education div element by its IDs
const getEducationDiv = document.getElementById('education');
// Get the profession div element by its IDs
const getProfessionDiv = document.getElementById('profession');
// Get the certification div element by its IDs
const getCertificationDiv = document.getElementById('certifications');
// Get the other option div element by its IDs
const getOtherOptionDiv = document.getElementById('otherOptions');
// Create a <h4> tag
let newElement = document.createElement('h4');

// Initialize a dictionary contains other info about Anna
let aboutAnna = {
   'Other Degree': 'Electronics Engineering Technology',
   'Interests': 'Learning math & programming languages',
   'Hobbies': 'Practicing classical piano, guitar, and singing',
   'Traveled Places': 'France, Italy, and England',
 };

 // Set 3 innerDivs to invisible mode
function setInnerDivsInvisible(){
   getProfessionDiv.style.display = 'none';
   getCertificationDiv.style.display ='none';
   getEducationDiv.style.display = 'none';
}
// This function sets other option div to visible  
function setOtherOptionsDivVisible(){
      getOtherOptionDiv.style.display = 'visible';
      getOtherOptionDiv.style.width = '50%';
      getOtherOptionDiv.style.height = '60%';
      getOtherOptionDiv.style.position = 'relative';
      getOtherOptionDiv.style.backgroundColor = 'rgb(248, 232, 221)';
      getOtherOptionDiv.style.marginLeft = '20px';
      getOtherOptionDiv.style.color = 'purple';
      getOtherOptionDiv.style.paddingLeft = '50px';
      getOtherOptionDiv.style.paddingTop = '50px';

}
// This function creates a <h4> tags and displays other degree
function createH4Elements(option){  
   newElement.innerHTML = aboutAnna[option];
   getOtherOptionDiv.appendChild(newElement);   
}



getSelectedElement.addEventListener('change', (Event) =>{  
   let option = getSelectedElement.value; 
   newElement.innerHTML = '';
   switch (option){
      case 'Other Degree':    
         setInnerDivsInvisible();
         setOtherOptionsDivVisible();
         createH4Elements(option);
        break;
      case 'Interests':
         setInnerDivsInvisible();
         setOtherOptionsDivVisible();
         createH4Elements(option);
         break;
      case 'Hobbies':
         setInnerDivsInvisible();
         setOtherOptionsDivVisible();
         createH4Elements(option);
         break;
      case 'Traveled Places':
         setInnerDivsInvisible();
         setOtherOptionsDivVisible();
         createH4Elements(option);
         break;
      case 'select one':
         location.reload();
      default:
  }      
});
