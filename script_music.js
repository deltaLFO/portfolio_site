// 1. DATABASE (Removed theme property)
const playlist = [
    { title: "Spring Waltz", poem: "Petals falling gently... A melody of the wind.", file: "tracks/song1.mp3" },
    { title: "Cyber Skies", poem: "Data streams on glass... Neon lights reflect on rain.", file: "tracks/song2.mp3" },
    { title: "Midnight Study", poem: "Candle wax dripping... The quiet hum of the night.", file: "tracks/song3.mp3" }
];

// 2. DOM ELEMENTS
const audio = document.getElementById('audio-engine');
const titleBox = document.getElementById('track-name');
const playBtn = document.getElementById('play-btn');
const paperTitle = document.getElementById('song-title-header');
const paperText = document.getElementById('song-description');

let currentIdx = 0; 

// 3. CORE FUNCTIONS
function loadSong(index) {
    const song = playlist[index];
    
    // Update Screen
    titleBox.innerText = song.title;
    
    // Update Bottom Info Panel
    if(paperTitle) paperTitle.innerText = song.title;
    if(paperText) paperText.innerText = song.poem;
    
    // Update Audio Source
    audio.src = song.file;
}

function handleTrackChange(direction) {
    if(direction === 'next') {
        currentIdx++;
        if (currentIdx > playlist.length - 1) currentIdx = 0;
    } else {
        currentIdx--;
        if (currentIdx < 0) currentIdx = playlist.length - 1;
    }

    // Load and Play immediately (No animation delay)
    loadSong(currentIdx);
    audio.play();
    playBtn.innerText = "II"; // Change symbol to Pause
}

function playPause() {
    if (audio.paused) { 
        audio.play(); 
        playBtn.innerText = "II"; 
    } else { 
        audio.pause(); 
        playBtn.innerText = "▶"; 
    }
}

// 4. EVENT LISTENERS
if(playBtn) { 
    playBtn.addEventListener('click', playPause);
    document.getElementById('next-btn').addEventListener('click', () => handleTrackChange('next'));
    document.getElementById('prev-btn').addEventListener('click', () => handleTrackChange('prev'));
    
    // Initial Load
    loadSong(0);
}