const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// images loaded
function imageLoaded(){
    imagesLoaded++;
    // console.log(imagesLoaded);
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        // console.log(ready);
    }
}

// you can create an seperate function to apply set attribute in the below function
// create element for links and phortos
function displayPhotos(){
    imagesLoaded = 0;
    photosArray.forEach((photo) => {

        totalImages = photosArray.length;
        // console.log('total images =', totalImages);

        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target',' _blank');

        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        img.addEventListener('load', imageLoaded);

        // appending image and item inside image conatainer element
        // basically we are creating an image element inside our image conatiner in html file with the help of javascript
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// unsplash url
const count = 5;
const apiKey = 'Ztq3F4xpMzXNr1R0dii49G6e5PvYSlKiRXKg_XpT1KI';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

// get photos

async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch (error) {
        alert("error")
    }
}

window.addEventListener('scroll', () => {
    // console.log('scrolled');
    if(window.innerHeight + window.scrollY > document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }

})

getPhotos(); 