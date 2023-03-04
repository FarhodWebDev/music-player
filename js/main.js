//

// BTN
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const play = document.querySelector(".fa-play");
const pause = document.querySelector(".fa-pause");

// UI
const img = document.getElementById("cover");
const title = document.getElementById("title");
const fulltime = document.getElementById("end");
const currentTime = document.getElementById("start");
const progress = document.getElementById("progress");

// music
const music = document.getElementById("audio");
const volume = document.getElementById("volume");

// CONTAINER
const container = document.getElementById("container");

// MENU
const menu = document.getElementById("menu");
const list = document.getElementById("list");
const open = document.getElementById("bars");
const close = document.getElementById("close");

const songs = [
 "Billie Eilish - Lovely",
 "Heather - Conan Gray",
 "Orxan - Unutmak Istiyorum",
 "Rauf Faik - метро",
];

const upLoadSong = (song) => {
 img.src = `../img/${songs[song]}.jpg`;
 title.innerHTML = songs[song];
 music.src = `../musics/${songs[song]}.mp3`;
 music.setAttribute("data-id", song);
 currentTime.innerText = "00:00";
 fulltime.innerText = "00:00";
};

//Play/Pause

let isPlaying = false;

const switchClass = (permission) => {
 if (!play.classList.contains("hidden") && permission == "another") {
  play.classList.toggle("hidden");
  pause.classList.toggle("hidden");
  //
 } else if (play.classList.contains("hidden") && permission) {
  //
 } else if (
  (play.classList.contains("hidden") || pause.classList.contains("hidden")) &&
  !permission
 ) {
  play.classList.toggle("hidden");
  pause.classList.toggle("hidden");
  //
 }
};

playBtn.addEventListener("click", () => {
 if (!isPlaying) {
  music.play();
  isPlaying = true;
  //
 } else {
  music.pause();
  isPlaying = false;
 }

 switchClass(false);
});

// Switch music

let index = music.dataset.id;

nextBtn.addEventListener("click", () => {
 index++;

 if (index != songs.length) {
  upLoadSong(index);
 } else {
  index = 0;
  upLoadSong(index);
 }
 music.play();
 isPlaying = true;
 switchClass("another");
 img.style.transform = "rotate(0)";
});

// Prev music
prevBtn.addEventListener("click", () => {
 const getIndex = +music.dataset.id;

 if (getIndex != 0 && !(getIndex >= songs.length)) {
  upLoadSong(getIndex - 1);
 } else upLoadSong(songs.length - 1);

 music.play();
 isPlaying = true;
 switchClass("another");
});

//----------------------------------//
window.addEventListener("keyup", (e) => {
 if (e.code.toLowerCase() == "space" || e.code == "MediaPlayPause") {
  if (play.classList.contains("hidden")) {
   music.pause();
   isPlaying = false;
   play.classList.remove("hidden");
   pause.classList.add("hidden");
  } else {
   music.play();
   isPlaying = true;
   play.classList.add("hidden");
   pause.classList.remove("hidden");
  }
 } else if (e.code == "MediaTrackNext") {
  index++;

  if (index != songs.length) {
   upLoadSong(index);
  } else {
   index = 0;
   upLoadSong(index);
  }
  music.play();
  isPlaying = true;
  switchClass("another");
 } else if (e.code == "MediaTrackPrevious") {
  const getIndex = +music.dataset.id;

  if (getIndex != 0 && !(getIndex >= songs.length)) {
   upLoadSong(getIndex - 1);
  } else upLoadSong(songs.length - 1);

  music.play();
  isPlaying = true;
 }

 if (isPlaying) {
  container.classList.add("play");
 } else {
  container.classList.remove("play");
 }
});

window.addEventListener("click", () => {
 if (isPlaying) {
  container.classList.add("play");
 } else {
  container.classList.remove("play");
 }
});

volume.addEventListener("input", () => {
 if (volume.value < 10) music.volume = `0.${volume.value}`;
 else if (volume.value == 10) music.volume = `0.${volume.value}`;
});

upLoadSong(1);

music.addEventListener("timeupdate", (e) => {
 let fullyTime = e.srcElement.duration;
 let currentlyTime = e.srcElement.currentTime;

 let minute = parseInt(fullyTime / 60);
 let secund = parseInt(fullyTime % 60);

 fulltime.innerText = `${minute}: ${secund < 10 ? "0" + secund : secund}`;

 let cMinute = parseInt(currentlyTime / 60);
 let cSecund = parseInt(currentlyTime % 60);

 currentTime.innerText = `${cMinute} : ${
  cSecund < 10 ? "0" + cSecund : cSecund
 }`;

 let progressTime = (100 * currentlyTime) / fullyTime;
 progress.style.width = `${progressTime}%`;

 if (progressTime >= 100) {
  index++;

  if (index != songs.length) {
   upLoadSong(index);
  } else {
   index = 0;
   upLoadSong(index);
  }
  music.play();
  isPlaying = true;
  switchClass("another");
  img.style.transform = "rotate(0)";
 }
});

progress.parentElement.addEventListener("click", (e) => {
 let userTime = (e.offsetX * 100) / 306;
 progress.style.width = `${userTime}%`;

 let musicDuration = music.duration;

 music.currentTime = (userTime * musicDuration) / 100;
});

const uploadMenu = () => {
 if (songs.length) {
  list.innerHTML = "";
  let index = 0;
  songs.forEach((song) => {
   list.innerHTML += `
   <li onclick="playFMenu(${index})">${song}</li>
   `;
   index++;
  });
 }
};

uploadMenu();

const playFMenu = (queue) => {
 upLoadSong(queue);
 music.play();
 switchClass("another");
};

const toggleClass = () => {
 menu.classList.toggle("show");
 open.classList.toggle("hidden");
};

open.addEventListener("click", toggleClass);

close.addEventListener("click", toggleClass);
