<script>    
const radioHtml = document.getElementById('html');

radioHtml.addEventListener('change', function(){
        if(radioHtml.checked){
                document.getElementsByClassName('screen').src="https://www.w3schools.com/html/html_intro.asp"
        }
        
})

function selected(){
        alert("You selected HTML!")
}

</script>