const datamusic = [
  {
    name: "Cold Water",
    singer: "Justin Bieber",
    img: "./dataimg/cold-water.jpg",
    path: "./datamusic/Cold-Water-Ocular-Remix-Major-Lazer-Justin-Bieber-M.mp3",
  },
  {
    name: "Muộn rồi mà sao còn",
    singer: "Sơn Tùng MTP",
    img: "./dataimg/muonroimasaocon.jpg",
    path: "./datamusic/MuonRoiMaSaoConTusoRemix-SonTungMTP-7021026.mp3",
  },
  {
    name: "Khi em lớn",
    singer: "Hoàng Dũng-Orange",
    img: "./dataimg/khiemlon.jpg",
    path: "./datamusic/KhiEmLonOrinnRemix-OrangeHoangDungTheVoice-7011445.mp3",
  },
  {
    name: "Người chơi hệ đẹp",
    singer: "16 Typh",
    img: "./dataimg/16typh.jpg",
    path: "./datamusic/NguoiChoiHeDepCukakRemix-16Typh-7037119.mp3",
  },
  {
    name: "They said",
    singer: "Binz",
    img: "./dataimg/binz.jpg",
    path: "./datamusic/They-Said-Touliver-Binz.mp3",
  },
  {
    name: "Tay To",
    singer: "MCK",
    img: "./dataimg/mck.jpg",
    path: "./datamusic/Tay-To-Rapital-MCK-RPT-PhongKhin.mp3",
  },
  {
    name: "Xich Them Chut",
    singer: "MCK",
    img: "./dataimg/mck.jpg",
    path: "./datamusic/XTC-Xich-Them-Chut-Remix-Rapital-Groovie-Tlinh-MCK.mp3",
  },
];

//render playlist
let playlist = document.getElementsByClassName("playlist")[0];

let playBtn = document.getElementsByClassName("btn btn-toggle-play")[0];
let heading = document.querySelector(`header h2`);
let cdThumb = document.getElementsByClassName("cd-thumb")[0];
let audio = document.getElementById("audio");
let playing = playBtn.querySelector("i");
let progress = document.getElementById("progress");
let cdwidth = document.getElementsByClassName("cd")[0];
let nextBtn = document.getElementsByClassName("btn-next")[0];
let prevBtn = document.getElementsByClassName("btn-prev")[0];
let randomBtn = document.getElementsByClassName("btn-random")[0];
let repeat = document.getElementsByClassName("btn-repeat")[0];
let song = document.getElementsByClassName("song");
currentSong = 0;
function renderdatamusic() {
  let html = ``;
  let a = datamusic.forEach(function (item, index) {
    html += `<div class="song ${
      index === currentSong ? "active" : ""
    }" data-index=${index}>
    <div
      class="thumb"
      style="background-image: url('${item.img}')"
    ></div>
    <div class="body">
      <h3 class="title">${item.name}</h3>
      <p class="author">${item.singer}</p>
    </div>
    <div class="option">
      <i class="fas fa-ellipsis-h"></i>
    </div>
    
    </div>`;
  });

  playlist.innerHTML = html;
}

// Cac thao tac tay
function handleEvent() {
  isRepeat = false;
  isPlaying = false;
  isRandom = false;
  let widthcd = cdwidth.offsetWidth;
  //Quay cdthumb
  const cdthumbAnimate = cdThumb.animate(
    [
      {
        transform: "rotate(360deg)",
      },
    ],
    {
      duration: 10000, //10s
      iterations: Infinity,
    }
  );
  cdthumbAnimate.pause();

  //cuon trang dieu chinh kich thuoc cd thumb

  document.onscroll = function () {
    const newWidth = widthcd - document.documentElement.scrollTop;
    cdwidth.style.width =
      newWidth > 0
        ? (cdwidth.style.width = newWidth + `px`)
        : (cdwidth.style.width = 0);
  };

  // bat/ tat nhac
  playBtn.onclick = function () {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };
  audio.onplay = function () {
    isPlaying = true;
    playing.classList.replace("fa-play", "fa-pause");
    cdthumbAnimate.play();
  };
  audio.onpause = function () {
    isPlaying = false;
    playing.classList.replace("fa-pause", "fa-play");
    cdthumbAnimate.pause();
  };
  audio.ontimeupdate = function () {
    if (audio.duration) {
      let persentProgress = (audio.currentTime / audio.duration) * 100;
      progress.value = persentProgress;
    }
  };
  progress.oninput = function (e) {
    audio.currentTime = (e.target.value / 100) * audio.duration;
  };
  // next bai hat
  nextBtn.onclick = function () {
    if (isRandom) {
      randomSong();
    } else {
      nextSong();
    }

    audio.play();
    renderdatamusic();
  };
  // prev bai hat
  prevBtn.onclick = function () {
    if (isRandom) {
      randomSong();
    } else {
      prevSong();
    }
    audio.play();
    renderdatamusic();
  };
  randomBtn.onclick = function (e) {
    isRandom = !isRandom;
    randomBtn.classList.toggle("active", isRandom);
  };
  audio.onended = function () {
    if (isRepeat) {
      audio.play();
    } else {
      nextBtn.click();
    }
  };
  repeat.onclick = function () {
    isRepeat = !isRepeat;
    repeat.classList.toggle("active", isRepeat);
  };
  playlist.onclick = function (e) {
    if (e.target.closest(".song:not(.active)") || e.target.closest(".option")) {
      if (e.target.closest(".song:not(.active)")) {
        currentSong = Number(
          e.target.closest(".song:not(.active)").dataset.index
        );
        loadCurrentSong();
        renderdatamusic();

        audio.play();
      }
    }
  };
}

// load bai hat dau tien
function loadCurrentSong() {
  heading.innerText = datamusic[currentSong].name;
  cdThumb.style.backgroundImage = `url(${datamusic[currentSong].img})`;
  audio.src = datamusic[currentSong].path;
}
//next bai hat
function nextSong() {
  currentSong++;
  if (currentSong >= datamusic.length) {
    currentSong = 0;
  }
  loadCurrentSong();
}
function prevSong() {
  currentSong--;
  if (currentSong < 0) {
    currentSong = datamusic.length - 1;
  }
  loadCurrentSong();
}
function randomSong() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * datamusic.length);
  } while (newIndex === currentSong);
  currentSong = newIndex;
  loadCurrentSong();
}
function start() {
  renderdatamusic();
  handleEvent();
  loadCurrentSong();
}
start();
