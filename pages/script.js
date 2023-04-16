const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const playlistElement = document.getElementById('playlist');

const playlist = [
  { title: 'Song 1', src: 'songs/美人鱼.mp3' },
  { title: 'Song 2', src: 'songs/渺小.wav' },
  { title: 'Song 3', src: 'songs/你是我的风景.wav' },
];

let currentSongIndex = 0;

function loadSong(song) {
  audio.src = song.src;
  audio.load();
}

function playSong() {
  audio.play();
  playButton.textContent = 'Pause';
}

function pauseSong() {
  audio.pause();
  playButton.textContent = 'Play';
}

function prevSong() {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = playlist.length - 1;
  }
  loadSong(playlist[currentSongIndex]);
  playSong();
}

function nextSong() {
  currentSongIndex++;
  if (currentSongIndex > playlist.length - 1) {
    currentSongIndex = 0;
  }

  function playSong() {
    audio.play();
    playButton.textContent = 'Pause';
  }
  
  function pauseSong() {
    audio.pause();
    playButton.textContent = 'Play';
  }
  
  function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
      currentSongIndex = playlist.length - 1;
    }
    loadSong(playlist[currentSongIndex]);
    playSong();
  }
  
  function nextSong() {
    currentSongIndex++;
    if (currentSongIndex > playlist.length - 1) {
      currentSongIndex = 0;
    }
    loadSong(playlist[currentSongIndex]);
    playSong();
  }
  
  function togglePlayPause() {
    if (audio.paused) {
      playSong();
    } else {
      pauseSong();
    }
  }
  
  function playSongAtIndex(index) {
    currentSongIndex = index;
    loadSong(playlist[currentSongIndex]);
    playSong();
  }
  
  playButton.addEventListener('click', togglePlayPause);
  prevButton.addEventListener('click', prevSong);
  nextButton.addEventListener('click', nextSong);
  
  playlist.forEach((song, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = song.title;
    listItem.addEventListener('click', () => playSongAtIndex(index));
    playlistElement.appendChild(listItem);
  });
  
  loadSong(playlist[currentSongIndex]);
  