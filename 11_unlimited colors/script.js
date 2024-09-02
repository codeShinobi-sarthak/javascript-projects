const startbtn = document.getElementById("start");
const stopbtn = document.getElementById("stop");
const body = document.body;
let intervalId;

startbtn.onclick = () => {
  console.log("started");
  if (!intervalId) {
    intervalId = setInterval(() => {
      const hexCode = "#" + Math.floor(Math.random() * 0xffffff).toString(16);
      body.style.backgroundColor = hexCode;
      console.log(hexCode);
    }, 1000);
  }
};

stopbtn.onclick = () => {
  clearInterval(intervalId);
  console.log("stopped");
  intervalId = null;
};
