const toggleSwitch = document.querySelector("input[type='checkbox']");
const nav = document.getElementById('nav')
const toggleIcon = document.getElementById('toggle-icon')
const image1 = document.getElementById('image1')
const image2 = document.getElementById('image2')
const image3 = document.getElementById('image3')
const textBox = document.getElementById('text-box')

// image color change
 function imageColor(color) {
    image1.src = `img/undraw_problem_solving_re_${color}.svg`
    image2.src = `img/undraw_solution_mindset_re_${color}.svg`
    image3.src = `img/undraw_web_development_${color}.svg`
 }

//  toggle mode (DRY code)
function toggleMode(isDark) {
    nav.style.backgroundColor = isDark ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255/ 50%)'
    textBox.style.backgroundColor = isDark ? 'white' : 'rgb(0 0 0 / 50%)'
    toggleIcon.children[0].textContent = isDark ? 'Dark Mode' : 'Light Mode'
    isDark ? toggleIcon.children[1].classList.replace('fa-sun','fa-moon') 
        :toggleIcon.children[1].classList.replace('fa-moon','fa-sun')
    isDark ? imageColor('dark') : imageColor('light');
}


// // dark mode function
// function darkMode() {
//     nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
//     textBox.style.backgroundColor = 'white';
//     toggleIcon.children[0].textContent = 'Dark Mode'
//     // toggleIcon.children[1].classList.remove('fa-sun')
//     // toggleIcon.children[1].classList.add('fa-moon')
//     toggleIcon.children[1].classList.replace('fa-sun','fa-moon')
//     imageColor('dark');
// }

// // light mode function
// function lightMode() {
//     nav.style.backgroundColor = 'rgb(255 255 255/ 50%)';
//     textBox.style.backgroundColor = 'rgb(0 0 0 / 50%)';
//     toggleIcon.children[0].textContent = 'Light Mode'
//     // toggleIcon.children[1].classList.remove('fa-moon')
//     // toggleIcon.children[1].classList.add('fa-sun')
//     toggleIcon.children[1].classList.replace('fa-moon','fa-sun')
//     imageColor('light');
// }


// switch theme dynamically
function switchTheme(event) {
    if(event.target.checked){
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark')
        toggleMode(true);
        // darkMode();
    }else{
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light')
        toggleMode(false);
        // lightMode();
    }
}

// Event listner
toggleSwitch.addEventListener('change', switchTheme);

 
// CHECK LOCAL STORAGE
const currentTheme = localStorage.getItem('theme');
if(currentTheme == 'dark') {
    document.documentElement.setAttribute('data-theme', currentTheme);
    toggleSwitch.checked = true;
    toggleMode(true)
    // darkMode();
}else{
    toggleMode(false)
    // lightMode();
}
