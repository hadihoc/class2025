greWords=[
  {"word": "Aberrant", "meaning": "deviating from the normal or correct course"},
  {"word": "Abhor", "meaning": "to regard with horror or loathing; to hate"},
  {"word": "Abscond", "meaning": "to leave hurriedly and secretly, typically to avoid detection"},
  {"word": "Alacrity", "meaning": "eager willingness or readiness"},
  {"word": "Anomaly", "meaning": "something that deviates from what is standard, normal, or expected"},
  {"word": "Apocryphal", "meaning": "of doubtful authenticity, although widely circulated as being true"},
  {"word": "Apt", "meaning": "appropriate or suitable in the circumstances"},
  {"word": "Arduous", "meaning": "requiring great effort; difficult and tiring"},
  {"word": "Assiduous", "meaning": "showing great care and perseverance"},
  {"word": "Benevolent", "meaning": "well-meaning and kindly"},
  {"word": "Belligerent", "meaning": "hostile and aggressive"},
  {"word": "Blithe", "meaning": "showing a casual and cheerful indifference; happy-go-lucky"},
  {"word": "Cacophony", "meaning": "a harsh, discordant mixture of sounds"},
  {"word": "Candid", "meaning": "truthful and straightforward; frank"},
  {"word": "Capricious", "meaning": "given to sudden and unaccountable changes of mood or behavior"},
  {"word": "Cogent", "meaning": "clear, logical, and convincing"},
  {"word": "Convoluted", "meaning": "extremely complex and difficult to follow"},
  {"word": "Deference", "meaning": "humble submission and respect"},
  {"word": "Diatribe", "meaning": "a forceful and bitter verbal attack against someone or something"},
  {"word": "Disparate", "meaning": "essentially different in kind; not allowing comparison"},
  {"word": "Ebullient", "meaning": "cheerful and full of energy"},
  {"word": "Enervate", "meaning": "to weaken or drain of energy"}]

const audio_url = document.getElementById('AudioPlayer');
async function fetchWordDefinition(/*word_search*/) {
let audio_address = {}

  try {
    /* const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word_search}`)*/
     const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/Belligerent`)
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      // Get audio url
      audio_address = data[0].phonetics[0].audio;
    
      get_audio(audio_address);
  } catch (error) {
      alert(error.Error);
      console.error('Error fetching the word definition:', error);
  }
}

// Wait until the HTML document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get the button and input elements
  const word_search = document.getElementById('TextBox');
  const searchBtn = document.getElementById('SearchBtn');
  
  // Add an event listener to the button
  searchBtn.addEventListener('click', function() {
      // Get the value from the input element
      const inputValue = word_search.value;
      fetchWordDefinition(inputValue);
      // Log the value to the console (or use it however you need)
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
fetchWordDefinition();
