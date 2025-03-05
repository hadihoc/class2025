 // Get the button and aside element by their IDs
 const button = document.getElementById('toggleButton');
 const aside = document.getElementById('sideMenu');

 // Add an event listener to the button
 button.addEventListener('click', function(){
    // Toggle the 'open' class on the aside to trigger the animation
    aside.classList.toggle('open');   
 });