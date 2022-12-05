/**
 * Добавление автора музыки в раздел "Artists"
 * @param name - автор
 * @param listeners - количество слушателей
 * @param image - ссылка на изображение
 */
function addArtist(name, listeners, image) {
    const div = document.getElementById("search-artists");
    const text = document.createElement("div");
    text.classList.add("square-text");
    const searchSquare = document.createElement("div");
    searchSquare.classList.add("search-square");
    const mainText = document.createElement("span");
    mainText.classList.add("square-mainText");
    mainText.innerText = name;
    text.append(mainText);
    const secondaryText = document.createElement("span");
    secondaryText.classList.add("square-secondaryText");
    secondaryText.innerText = listeners + " lst-s";
    text.append(secondaryText);
    const img = document.createElement("img");
    img.classList.add("square-image");
    img.src = image;
    searchSquare.append(img);
    searchSquare.append(text);
    div.append(searchSquare);
}

/**
 * Добавление альбома в раздел "Albums"
 * @param album - название альбома
 * @param name - автор
 * @param image - ссылка на изображение
 */
function addAlbum(album, name, image) {
    const div = document.getElementById("search-albums");
    const text = document.createElement("div");
    text.classList.add("square-text");
    const searchSquare = document.createElement("div");
    searchSquare.classList.add("search-square");
    const albumText = document.createElement("span");
    albumText.classList.add("square-mainText");
    albumText.innerText = album;
    text.append(albumText);
    const artistText = document.createElement("span");
    artistText.classList.add("square-secondaryText");
    artistText.innerText = name;
    text.append(artistText);
    const img = document.createElement("img");
    img.classList.add("square-image");
    img.src = image;
    searchSquare.append(img);
    searchSquare.append(text);
    div.append(searchSquare);
}

/**
 * Добавление трека в раздел "Tracks"
 * @param name - название
 * @param artist - автор
 * @param image - ссылка на изображение
 */
function addTrack(name, artist, image) {
    const div = document.getElementById("search-list");
    const track = document.createElement("div");
    track.classList.add("search-track");
    const img = document.createElement("img");
    img.classList.add("search-track-img");
    img.src = image;
    const trackText = document.createElement("span");
    trackText.classList.add("search-trackName");
    trackText.innerText = name;
    const albumText = document.createElement("span");
    albumText.classList.add("search-artistName");
    albumText.innerText = artist;
    track.append(img);
    track.append(trackText);
    track.append(albumText);
    div.append(track);
}

/**
 * Поиск данных
 * @param req - строка по которой будет обращение
 * @returns результат поиска данных
 */
async function searchReq(req) {
    try {
        const response = await fetch(req);
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error("Search error. Status: " + response.status);
        }
    } catch (err) {
        alert(err);
    }
}

/**
 * Поиск и отображение авторов по запросу
 */
async function findArtists(text) {
    const artistsSearch = await searchReq(`https://ws.audioscrobbler.com/2.0/?method=artist.search&api_key=${apiKey}&format=json&limit=8&artist=${text}`);
    const artist = artistsSearch.results.artistmatches.artist;
    for (let i = 0; i < artist.length; i++) {
        addArtist(artist[i].name, artist[i].listeners, artist[i].image[2]["#text"]);
    }
}

/**
 * Поиск и отображение альбомов по запросу
 */
async function findAlbums(text) {
    const albumsSearch = await searchReq(`https://ws.audioscrobbler.com/2.0/?method=album.search&api_key=${apiKey}&format=json&limit=8&album=${text}`);
    const album = albumsSearch.results.albummatches.album;
    for (let i = 0; i < album.length; i++) {
        addAlbum(album[i].name, album[i].artist, album[i].image[2]["#text"]);
    }
}

/**
 * Поиск и отображение треков по запросу
 */
async function findTracks(text) {
    const trackSearch = await searchReq(`https://ws.audioscrobbler.com/2.0/?method=track.search&api_key=${apiKey}&format=json&limit=10&track=${text}`);
    const track = trackSearch.results.trackmatches.track;
    for (let i = 0; i < track.length; i++) {
        addTrack(track[i].name, track[i].artist, track[i].image[2]["#text"]);
    }
}

const apiKey = "7d42f21017e5fd6eb4e9e85c95ccd20f";
const params = new URLSearchParams(window.location.search)
const request = params.get("request");
if ((request === null) || (request.trim() === "")) {
    const label = document.createElement("label");
    label.classList.add("search-label");
    label.textContent = "Please enter your non-empty request";
    document.getElementById("searchForm").append(label);
} else {
    document.getElementById("searchLabel").textContent = "Search results: " + request;
    findArtists(request);
    findAlbums(request);
    findTracks(request);
}