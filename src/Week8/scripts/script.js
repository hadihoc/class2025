/*   */
const audio_url = document.getElementById('AudioPlayer');
let audio_address = {}


async function fetchWordDefinition(word_search) {
  try {
    
      let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word_search}`);
      
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data[0].word);

      // Get audio URL safely
      const phonetics = data[0]?.phonetics || [];
      const audioUrl = phonetics.find(p => p.audio)?.audio;

      if (audioUrl) {
          get_audio(audioUrl); // call your function with the URL
      } else {
          console.warn("No audio URL found for this word.");
      }

  } catch (error) {
      alert(`Error: ${error.message}`);
      console.error('Error fetching the word definition:', error);
    }
}

// Wait until the HTML document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get the button and input elements
  const word_search = document.getElementById('TextBox');
  const searchBtn = document.getElementById('SearchBtn');
  
  // Add an event listener to the button
  searchBtn.addEventListener('click', function(event) {
      event.preventDefault();
      // Get the value from the input element
      let inputValue = word_search.value;
      fetchWordDefinition(inputValue);
      // Log the value to the console
      console.log('Input value:', inputValue);
      
  });
});

function get_audio(audio_address){
 
  if(audio_address == ''){
    alert("No audio is found.");
  }
  else {
    audio_url.src = audio_address;
  }
}

function get_synonym(data){
    let 
}
fetchWordDefinition();
