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
   'Interests': 'Learning mathematics & coding',
   'Hobbies': 'Practicing piano, guitar, and singing',
   'Traveled Places': 'France, Italy, and England',
 };

 let images = {'Traveled Places': "'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcRIPCIx39wdVSrLEi4kgP2-B0QgzPmVovT17B6cleo02iF0oRNPa-lAp4KrvF_U6ZUDep6p6W2LQbX3N-455Fi0Z4-FPevyf8Ek3vNpFA'",
               'Other Degree':'https://t3.ftcdn.net/jpg/09/74/89/20/240_F_974892088_19RtAYgktnA2lx8H7tWZAXgblAikWXkm.jpg',
               'Interests':'https://m.media-amazon.com/images/I/51bxnNLuheL.jpg',
               'Hobbies':'https://thumbs.dreamstime.com/b/music-notes-background-7533715.jpg?w=768',
            
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
         getOtherOptionDiv.style.backgroundImage = "url('../webLanguages.png')";
      }
      else if (value === 'Hobbies'){
         getOtherOptionDiv.style.backgroundImage = "url('https://cdn.pixabay.com/photo/2017/03/24/15/26/piano-2171359_1280.jpg')";
   
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
   }
   else if (value === 'Interests'){
      newElement.style.width = '300px';
      newElement.style.color = 'yellow';
      newElement.style.backgroundColor = 'transparent';
      getOtherOptionDiv.style.paddingTop = '0%';
   }
   else if (value === 'Hobbies'){
      newElement.style.width = '260px';
      newElement.style.backgroundColor = 'transparent';
      newElement.style.color = 'orange';
      getOtherOptionDiv.style.paddingTop = '0%';
      getOtherOptionDiv.style.paddingLeft = '0%';
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
