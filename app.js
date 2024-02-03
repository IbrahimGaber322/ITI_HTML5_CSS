volumeControl.value = 50;
volume.innerText = 50;
let username= localStorage.getItem("username")||null;
title.innerText = `Welcome${username == null? " ":` ${username} `}to SpaceToon`
const allImages = document.querySelectorAll(".img");


const changeSong = (caller) => {
  source.src = `audio/${caller.id}.mp3`;
  audio.load();
  audio.volume = volumeControl.value / 100;
  allImages.forEach((img) => img.classList.remove("focused-image"));
  caller.classList.add("focused-image");
  audio.play();
  audioPlayer.style.display = "flex";
};

playButton.onclick = () => {
  audio.paused ? audio.play() : audio.pause();
};

audio.onplay = () => {
  playButton.classList.add("fa-pause");
  playButton.classList.remove("fa-play");
};
audio.onpause = () => {
  playButton.classList.add("fa-play");
  playButton.classList.remove("fa-pause");
};
audio.onended = () => {
  playButton.classList.add("fa-play");
  playButton.classList.remove("fa-pause");
};
audio.ontimeupdate = () => {
  progressBar.value = (audio.currentTime * 100) / audio.duration;

  duration.innerText = `${timeFormatter(audio.currentTime)}/${timeFormatter(
    audio.duration
  )}`;
};
volumeIcon.onclick = () => {
  if (audio.muted) {
    audio.muted = false;
    volumeIcon.classList.add("fa-volume-high");
    volumeIcon.classList.remove("fa-volume-xmark");
  } else {
    audio.muted = true;
    volumeIcon.classList.add("fa-volume-xmark");
    volumeIcon.classList.remove("fa-volume-high");
  }
};
volumeControl.oninput = () => {
  audio.volume = volumeControl.value / 100;
  volume.innerText = volumeControl.value;
};
progressBar.oninput = () => {
  audio.currentTime = audio.duration * (progressBar.value / 100);
};

const timeFormatter = (time) => {
  if (isNaN(Number(time))) {
    return "00:00";
  } else if (time < 60) {
    return `00:${Math.floor(time % 60)}`;
  } else if (time >= 60 && time < 600) {
    return `0${Math.floor(time / 60)}:${Math.floor(time % 60)}`;
  } else {
    return `${Math.floor(time / 60)}:${Math.floor(time % 60)}`;
  }
};

feedback.onclick = () => {
  form.classList.toggle("display-none");
};



form.onsubmit = function () {
  handleSubmit(event, this);
};

const handleSubmit = (e, form) => {
  e.preventDefault();

  const formData = new FormData(form);
  if (validator(formData)) {
    alert(
      `Thank you ${
        formData.get("firstName") + " " + formData.get("lastName")
      } for your valuable feedback, 
I'll make sure to reach out to you at your email: ${formData.get(
           "email"
         )}`
    );
    localStorage.setItem("username",  formData.get("firstName") + " " + formData.get("lastName"));
    username= formData.get("firstName") + " " + formData.get("lastName");
    form.reset();
    form.classList.toggle("display-none");
  }
};

const validator = (data) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const namePattern = /^[a-zA-z]{2,}$/;
  const ratingPattern = /^(10|[0-9])$/;
  let valid = true;
  const entries = [...data.entries()];

  console.log("ay 7aga")

  entries.forEach((e) => {
    switch (e[0]) {
      case "firstName":
        valid = namePattern.test(e[1]);
        !valid && firstNameError.classList.remove("display-none");
        !valid && firstName.classList.add("input-error");
        break;
      case "lastName":
        valid = namePattern.test(e[1]);
        !valid && lastNameError.classList.remove("display-none");
        !valid && lastName.classList.add("input-error");
        break;
      case "rating":
        valid = ratingPattern.test(e[1]);
        !valid && ratingError.classList.remove("display-none");
        !valid && rating.classList.add("input-error");
        break;
      case "email":
        valid = emailPattern.test(e[1]);
        !valid && emailError.classList.remove("display-none");
        !valid && email.classList.add("input-error");
        break;
      default:
        break;
    }
    if (!valid) return valid;
  });

  return valid;
};
const win = new Audio("audio/win.mp3");

const randomColor = () => {
  const red = Math.floor(Math.random() * 6) * 10;
  const green = Math.floor(Math.random() * 6) * 10;
  const blue = Math.floor(Math.random() * 6) * 10;
  redSlider.value = 0;
  greenSlider.value = 0;
  blueSlider.value = 0;
  if (red == 0 && green == 0 && blue == 0) randomColor();
  defaultCircle.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
};
const updateColor = () => {
  const red = redSlider.value;
  const green = greenSlider.value;
  const blue = blueSlider.value;
  const color = `rgb(${red}, ${green}, ${blue})`;
  console.log(defaultCircle.style.backgroundColor);
  console.log(color);
  playerCircle.style.backgroundColor = color;
  setTimeout(() => {
    if (color == defaultCircle.style.backgroundColor) {
      win.volume = volumeControl.value / 100;
      win.play();
      alert("Congrats you win :D");

      randomColor();
    }
  }, 500);
};
randomColor();


colorPicker.value="#ffffff";
const ctx = canvas.getContext("2d");
let shape = null;
const shapes = document.querySelectorAll(".shapes-icon");

const bounds = canvas.getBoundingClientRect();

colorPicker.onchange = () => {
  shapes.forEach((s) => (s.style.color = colorPicker.value));
};

const selectShape = (caller) => {
  shape = caller.id;
  shapes.forEach((s) => s.classList.remove("focused-shape"));
  caller.classList.add("focused-shape");
  
};
function handleClick(event) {
  const x = event.clientX - bounds.left;
  const y = event.clientY - bounds.top;
  switch (shape) {
    case "square":
      drawSquare(x, y);
      break;
    case "rectangle":
      drawRectangle(x, y);
      break;
    case "circle":
      drawCircle(x, y);
      break;
    case "triangle":
      drawTriangle(x, y);
      break;
    default:
      break;
  }
}
function drawSquare(x, y) {
  ctx.beginPath();
  ctx.rect(x - 20, y - 20, 40, 40);
  ctx.fillStyle = colorPicker.value;
  ctx.fill();
  ctx.closePath();
}

function drawRectangle(x, y) {
  ctx.beginPath();
  ctx.rect(x - 30, y - 20, 60, 40);
  ctx.fillStyle = colorPicker.value;
  ctx.fill();
  ctx.closePath();
}

function drawTriangle(x, y) {
  ctx.beginPath();
  ctx.moveTo(x, y - 20);
  ctx.lineTo(x + 20, y + 20);
  ctx.lineTo(x - 20, y + 20);
  ctx.fillStyle = colorPicker.value;
  ctx.fill();
  ctx.closePath();
}
function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, 2 * Math.PI);
  ctx.fillStyle = colorPicker.value;
  ctx.fill();
  ctx.closePath();
}

canvas.onclick = (e) => {
  handleClick(e);
};
trash.onclick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

/* const getLocation = async () => {

  try {
    if ("geolocation" in navigator) {
      const position = await getPosition();

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Use a service like a reverse geocoding API to get the country based on latitude and longitude
      
      map.src = `https://www.google.com/maps/embed/v1/view?key=${googleApiKey}&center=${latitude},${longitude}&zoom=15`;
      map.classList.remove("display-none");
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  } catch (error) {
    console.log(error);
  }

 


};

getLocation(); */




