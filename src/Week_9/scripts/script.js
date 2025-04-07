const word_search = document.getElementById('text-box');
const searchBtn = document.getElementById('search-btn');
const word = document.getElementById('word');
const partOfSpeech = document.getElementById('part-of-speech');


async function fetchWordDefinition(word_search) {
  word.innerHTML = '';
  partOfSpeech.innerHTML = '';

  try {
    
      let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word_search}`);
      
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();      
      
      // Call the get audio
      get_audio(data);
      
      // Call the get word function 
      get_word(data);     

      // Call the get definition function
      get_part_of_speech(data)


  } catch (error) {
      alert(`The request resource could not be found: ${error.message}`);
      console.error("The requested resource couldn'\t be found.", error);
    }
}

// Wait until the HTML document is fully loaded
document.addEventListener('DOMContentLoaded', function() {  
  // Add an event listener to the button
  searchBtn.addEventListener('click', () => {
      const left_container = document.getElementById('flex-item-left');
      const right_container = document.getElementById('flex-item-right');     
      left_container.style.display = 'block';      
      right_container.style.paddingLeft = '10%';
      /*right_container.style.backgroundColor = '#882b2b';*/
      let inputValue = word_search.value;
      fetchWordDefinition(inputValue);
    
  });
});

function get_audio(data){
  const audio_url = document.getElementById('audio-player');
  const phonetics = data[0]?.phonetics || [];
  const audioUrl = phonetics.find(p => p.audio)?.audio;

  if (audioUrl !='') {
     audio_url.src = audioUrl;
  }else {
     console.warn("No audio URL found for this word.");
    }

}
function get_word(data){   
   word.innerHTML += data[0].word;
}
function get_part_of_speech(data){
  let part_Of_Speech = data[0]?.meanings[0].partOfSpeech;
  partOfSpeech.innerHTML += part_Of_Speech;
}

