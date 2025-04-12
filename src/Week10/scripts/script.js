const word_search = document.getElementById('input-word');
const searchBtn = document.getElementById('search-btn');
const word = document.getElementById('word');
const partOfSpeech = document.getElementById('part-of-speech');
const wordDefinition = document.getElementById('word-definition');
const noAudio = document.getElementById('no-audio');

async function fetchWordDefinition(word_search) {
    word.innerHTML = '';
    partOfSpeech.innerHTML = '';
    noAudio.innerHTML = '';
    wordDefinition.innerHTML = '';
    try {
        // API fetch, Free Dictionary API provided by dictionaryapi.dev 
        let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word_search}`);
    
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();      
        console.log(word_search);
        // Call the get audio
        get_audio(data);
        
        // Call the get word function 
        get_word(data);     
  
        // Call the get definition function
        get_part_of_speech(data)

        // testing for def
        get_definition(data)
  
    } catch (error) {
        alert(`The request resource could not be found: ${error.message}`);
        console.error("The requested resource couldn'\t be found.", error);
      }
  }

    // Wait until the HTML document is fully loaded
    document.addEventListener('DOMContentLoaded', function() {  
        const left_container = document.getElementById('left-items-container');
        const right_container = document.getElementById('right-items-container');  
        // Add an event listener to the button
        searchBtn.addEventListener('click', (event) => {
            event.preventDefault();            
            left_container.style.display = 'block';   // Displays left container   
            right_container.style.paddingTop = '5%';                   
            let inputValue = word_search.value;
            fetchWordDefinition(inputValue);
      
        });
  });

  function get_audio(data){
    const audio_url = document.getElementById('audio-player');
    const phonetics = data[0]?.phonetics || [];
    const audioUrl = phonetics.find(p => p.audio)?.audio;
    audio_url.src = audioUrl;

      if (typeof(audioUrl) === "undefined" || audioUrl === null || audioUrl === "") {
          
          noAudio.style.display = 'block';
          noAudio.innerHTML = "Audio is not found.";
      }
      else{
            noAudio.style.display = 'none';
      }
  }

  function get_word(data){   
     word.innerHTML += data[0].word;
  }
  function get_part_of_speech(data){
    let part_Of_Speech = data[0]?.meanings[0].partOfSpeech;
    partOfSpeech.innerHTML += part_Of_Speech;
  }
  function get_definition(data){
    let definition = data[0]?.meanings[0].definitions[0].definition;
    wordDefinition.innerHTML += definition;
  }
  
 


