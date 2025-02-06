

const toggleButton = document.getElementById('Dark'); 
const icon = document.getElementById('icon');
const buttonText = document.getElementById('buttonText'); 
const Buttons = document.querySelectorAll('button');
const img = document.querySelectorAll('img'); 
const footer = document.querySelector('footer');
const Divs = document.querySelectorAll('.content, .content2,main-div');



toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode'); 

    img.forEach(img => {
        img.classList.toggle('dark-mode');
    });

    
    footer.classList.toggle('dark-mode');

    
    Divs.forEach(div => {
        div.classList.toggle('dark-mode');
    });

   
    Buttons.forEach(btn => {
        btn.classList.toggle('dark-mode');
    });

    
    if (document.body.classList.contains('dark-mode')) {
        buttonText.textContent = 'Light Mode';
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        buttonText.textContent = 'Dark Mode';
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
       
    }
});
