const videoElement = document.getElementById('video');
const button = document.getElementById("button");

// prompt to select media stream, pass to video element, then play
async function selectMedia(){
    try {
        const captureStream = await  navigator.mediaDevices.getDisplayMedia(videoElement);
        videoElement.hidden = false;
        videoElement.srcObject = captureStream;
        videoElement.onloadedmetadata = () => {
            videoElement.requestPictureInPicture();
            videoElement.hidden = true;
            videoElement.play();
        }
    } catch (error) {
        console.log("error occured", error);
    }
}

button.addEventListener('click',  ()=>{
    button.hidden = true;
     selectMedia();
    // videoElement.requestPictureInPicture();
    // button.disabled = false;
    button.hidden = false;
})



