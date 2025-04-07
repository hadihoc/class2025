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
// get search element by its IDs
const getSearchElement = document.getElementById('searchContent');
// get submit button element by its IDs
const getButtonElement = document.getElementById('submitButton');
// get search result element by its IDs
const getSearchResult = document.getElementById('display');
//document.getElementById("contactsMenu").style.height = "100px"; // Set the height to 100px

// Initialize a dictionary contains other info about Anna
let aboutAnna = {
   'Other Degree': 'Electronics Engineering Technology',
   'Interests': 'Learning mathematics & coding',
   'Interest': 'Learning mathematics & coding',
   'Hobbies': 'Practicing piano, guitar, and singing',
   'Traveled Places': 'France, Italy, and England',
   'Education': 'Bachelor Degree in Computer Science',
 };


 // Set 3 innerDivs to invisible mode
function setInnerDivsInvisible(){
   getProfessionDiv.style.display = 'none';
   getCertificationDiv.style.display ='none';
   getEducationDiv.style.display = 'none';
}
// This function sets other option div to visible 
function setOtherOptionsDivVisible(option){
   const value = option;
      getOtherOptionDiv.style.display = 'visible';
      getOtherOptionDiv.style.width = '50%';
      getOtherOptionDiv.style.height = '60%';
      getOtherOptionDiv.style.position = 'relative';
      getOtherOptionDiv.style.marginLeft = '20px';
      getOtherOptionDiv.style.color = 'whitesmoke';
      getOtherOptionDiv.style.paddingLeft = '50px';
      getOtherOptionDiv.style.paddingTop = '50px'; 
      getOtherOptionDiv.style.position = 'relative';
      getOtherOptionDiv.style.backgroundRepeat = 'no-repeat';

      if (value === 'Traveled Places'){
         getOtherOptionDiv.style.backgroundImage = "url('https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcRIPCIx39wdVSrLEi4kgP2-B0QgzPmVovT17B6cleo02iF0oRNPa-lAp4KrvF_U6ZUDep6p6W2LQbX3N-455Fi0Z4-FPevyf8Ek3vNpFA')";
      }
      else if(value === 'Other Degree'){
         getOtherOptionDiv.style.backgroundImage = "url('https://t3.ftcdn.net/jpg/09/74/89/20/240_F_974892088_19RtAYgktnA2lx8H7tWZAXgblAikWXkm.jpg')";
      }
      else if (value === 'Interests'){
         getOtherOptionDiv.style.backgroundImage = "url('https://img.freepik.com/free-vector/geometry-education-blue-background-vector-frame-disruptive-education-digital-remix_53876-114094.jpg?t=st=1741561868~exp=1741565468~hmac=0303a2580922fde3e4e84a70e8524955155d1550b574509cb85f3c8d5b5c2b32&w=826')";
      }
      else if (value === 'Hobbies'){
         getOtherOptionDiv.style.backgroundImage = "url('https://c7.alamy.com/comp/DMXD6H/music-notes-with-birds-vector-DMXD6H.jpg')";
   
      }
}  

// This function creates a <h4> tags and displays other degree
function createH4Elements(option){
   const value = option;    
   newElement.innerHTML = aboutAnna[value];
   getOtherOptionDiv.appendChild(newElement);
   newElement.style.textAlign = 'center'; 
   newElement.style.backgroundColor = 'black';
   newElement.style.color = 'white';

   if (value === 'Traveled Places'){
      newElement.style.width = '200px';
      newElement.style.marginLeft = '50px';
      newElement.style.backgroundColor = '#87CEEB';
      newElement.style.color = 'black';
   }
   else if(value === 'Other Degree'){
      newElement.style.width = '260px';
      getOtherOptionDiv.style.width = '500px';
      getOtherOptionDiv.style.height = '350px';
   }
   else if (value === 'Interests'){
      newElement.style.width = '300px';
      newElement.style.color = 'white';
      newElement.style.marginTop = '50px';
      newElement.style.backgroundColor = 'transparent';
      getOtherOptionDiv.style.paddingLeft = '200px';
   }
   else if (value === 'Hobbies'){
      newElement.style.width = '300px';
      newElement.style.backgroundColor = 'transparent';
      newElement.style.color = 'black';
      getOtherOptionDiv.style.width = '500px';
      getOtherOptionDiv.style.height = '350px';
      getOtherOptionDiv.style.paddingTop = '0%';
      getOtherOptionDiv.style.paddingLeft = '140px';
   }
}



getSelectedElement.addEventListener('change', (Event) =>{  
   let option = getSelectedElement.value; 
   newElement.innerHTML = '';
   switch (option){
      case 'Other Degree':    
         setInnerDivsInvisible();
         setOtherOptionsDivVisible(option);
         createH4Elements(option);
        break;
      case 'Interests':
         setInnerDivsInvisible();
         setOtherOptionsDivVisible(option);
         createH4Elements(option);
         break;
      case 'Hobbies':
         setInnerDivsInvisible();
         setOtherOptionsDivVisible(option);
         createH4Elements(option);
         break;
      case 'Traveled Places':
         setInnerDivsInvisible();
         setOtherOptionsDivVisible(option);
         createH4Elements(option);
         break;
      case 'select one':
         location.reload();
      default:
  }      
});

function getValue(){
   let content = getSearchElement.value;
   getSearchResult.innerHTML = '';

   if (content == ''){
      getSearchResult.innerHTML = 'Please enter a keyword in the search field below. Example: education, interests, hobbies';
   }
   else{
      for (let key in aboutAnna){
         if ( content.toUpperCase() == key.toUpperCase()){
          getSearchResult.innerHTML = aboutAnna[key];
         }   
      }
   }
}