let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('.heading-2'); 

menu.addEventListener('click', () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

window.addEventListener('scroll', () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    if (window.scrollY > 150) {
        header.classList.add('active'); 
    } else {
        header.classList.remove('active');
    }
});

let countDate = new Date("February 20, 2025 12:00:00").getTime();

function CountDown() {
    let now = new Date().getTime();
    let gap = countDate - now;

    if (gap <= 0) {
        document.getElementById("day").innerText = "00";
        document.getElementById("hour").innerText = "00";
        document.getElementById("minute").innerText = "00";
        document.getElementById("second").innerText = "00";
        return;
    }

    let second = 1000;
    let minute = second * 60;
    let hour = minute * 60;
    let day = hour * 24;

    let d = Math.floor(gap / day);
    let h = Math.floor((gap % day) / hour);
    let m = Math.floor((gap % hour) / minute);
    let s = Math.floor((gap % minute) / second);

    document.getElementById("day").innerText = d.toString().padStart(2, "0");
    document.getElementById("hour").innerText = h.toString().padStart(2, "0");
    document.getElementById("minute").innerText = m.toString().padStart(2, "0");
    document.getElementById("second").innerText = s.toString().padStart(2, "0");
}

setInterval(CountDown, 1000);


CountDown();
