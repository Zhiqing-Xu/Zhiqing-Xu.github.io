const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");
const playlistContainer = document.querySelector(".playlist-container");
const playlist = document.querySelector(".playlist");
const volumeSlider = document.querySelector("#volume");


// song titles
const songs = ['一场夏事 - YiLuo', '不老梦 - YiLuo', '修炼爱情 - YiLuo', '凉城 - YiLuo', '半壶纱 - YiLuo', '反正 - YiLuo', '告白气球 - YiLuo', '哎呀呀 - YiLuo', '在树上唱歌 - YiLuo', '天下无双 - YiLuo', '天真 - YiLuo', '宝贝 - YiLuo', '小手拉大手 - YiLuo', '小永远 - YiLuo', '山外小楼夜听雨 - YiLuo', '待我长发及腰 - YiLuo', '心上的风 - YiLuo', '忽而今夏 - YiLuo', '我们说好的 - YiLuo', '我想 - YiLuo', '我想你了 - YiLuo', '我的一个道姑朋友 - YiLuo', '我的女人 - YiLuo', '星月神话 - YiLuo', '星河叹 - YiLuo', '最初的梦想 - 片段 - YiLuo', '最暖的忧伤 - YiLuo', '梦里花 - YiLuo', '椿 - YiLuo', '每一句都很甜 - YiLuo', '永不失联的爱 - YiLuo', '浪费 - YiLuo', '熬夜上瘾 - YiLuo', '爱殇7.0 - YiLuo', '爱的早餐 - YiLuo', '爱的飞行日记 - YiLuo', '爱的魔法 - YiLuo', '等下一个他 - YiLuo', '老伴 - YiLuo', '起风了 - YiLuo', '遗憾 - 片段 - YiLuo', '醉清风 - YiLuo', '静悄悄 - YiLuo', '非你不爱 - YiLuo'];
// keep track of songs
let songIndex = 0;


// initially load song info DOM
loadSong(songs[songIndex]);
createPlaylistItems();


// update song details
function loadSong(song) {
    title.innerText = song;

    cover.src = `assets_music/thumbnail/${song}.jpg`;
    cover.onerror = () => {
        cover.src = "assets_music/thumbnail/general.png";
      };


    audio.src = `assets_music/music/${song}.mp3`;
    audio.onerror = () => {
        audio.src = `assets_music/music/${song}.wav`;
    };
    
}


function tryPlaySong() {
    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                // Playback started successfully
                musicContainer.classList.add("play");
                playBtn.querySelector("i.fas").classList.remove("fa-play");
                playBtn.querySelector("i.fas").classList.add("fa-pause");
            })
            .catch((error) => {
                // Auto-play was prevented, show the play button
                musicContainer.classList.remove("play");
                playBtn.querySelector("i.fas").classList.add("fa-play");
                playBtn.querySelector("i.fas").classList.remove("fa-pause");
            });
    }
}



function playSong() {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");

    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                // Playback started successfully
            })
            .catch((error) => {
                // Auto-play was prevented, handle it here
                audio.play();
            });
    }

    // Add this line to show the playlist when the play button is clicked
    playlistContainer.style.display = "block";
}

function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fas").classList.add("fa-play");
    playBtn.querySelector("i.fas").classList.remove("fa-pause");

    audio.pause();

    // Add this line to hide the playlist when the pause button is clicked
    playlistContainer.style.display = "none";
}


// Add this function to create the playlist items
function createPlaylistItems() {
    songs.forEach((song, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = song;
        listItem.dataset.index = index;
        if (index === songIndex) {
            listItem.classList.add("active");
        }
        listItem.addEventListener("click", selectSongFromPlaylist);
        playlist.appendChild(listItem);
    });
}

// Add this function to handle song selection from the playlist
function selectSongFromPlaylist(e) {
    const selectedSong = e.target;
    songIndex = parseInt(selectedSong.getAttribute("data-index"));

    loadSong(songs[songIndex]);

    if (musicContainer.classList.contains("play")) {
        audio.pause();
        playSong();
    } else {
        musicContainer.classList.add("play");
        playSong();
    }

    updatePlaylist();
}


// Add this function to update the active song in the playlist
function updatePlaylist() {
    Array.from(playlist.children).forEach((listItem, index) => { // Use playlist.children instead of playlist.childNodes
        listItem.classList.remove("active");
        if (index === songIndex) {
            listItem.classList.add("active");
        }
    });
}



// song prev / next play function
function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    if (musicContainer.classList.contains("play")) {
        playSong();
    } else {
        musicContainer.classList.add("play");
        playSong();
    }
    updatePlaylist();
}



function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    if (musicContainer.classList.contains("play")) {
        playSong();
    } else {
        musicContainer.classList.add("play");
        playSong();
    }
    updatePlaylist();
}

function initializePlayer() {
    // Mute the audio initially
    audio.muted = true;

    // Try to play the song
    tryPlaySong();
}

// update audio time progress
function updateProgress(e) {
    /* console.log(e.srcElement);
        console.log(e.srcElement.currentTime);
        console.log(e.srcElement.duration); */

    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// set audio time progress
function setProgress(e) {
    const width = this.clientWidth;
    // console.log(width);

    const clickX = e.offsetX;
    // console.log(clickX);

    duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// event listeners
playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("play");

    // Unmute the audio when the play button is clicked
    audio.muted = false;

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});


volumeSlider.addEventListener("input", (e) => {
    audio.volume = e.target.value;
});



// change song events
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);

// when song end auto play next song
audio.addEventListener("ended", nextSong);

// Add this event listener to play the song when the page loads
initializePlayer();


