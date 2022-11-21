/**
 * Поиск авторов музыки
 * @param text - строка для поиска
 * @returns результат поиска авторов музыки
 */
async function searchArtists(text) {
    try {
        let response = await fetch("https://ws.audioscrobbler.com/2.0/?method=artist.search&api_key=7d42f21017e5fd6eb4e9e85c95ccd20f&format=json&limit=8&artist=" + text);
        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error("Artists not received. Status: " + response.status);
        }
    } catch (err) {
        console.error(err);
    }
}

/**
 * Добавление автора музыки в раздел "Artists"
 * @param name - автор
 * @param listeners - количество слушателей
 * @param image - ссылка на изображение
 */
function addArtist(name, listeners, image) {
    let div = document.getElementById("search-artists");
    let text = document.createElement("div");
    text.classList.add("square-text");
    let searchSquare = document.createElement("div");
    searchSquare.classList.add("search-square");
    let mainText = document.createElement("span");
    mainText.classList.add("square-mainText");
    mainText.innerText = name;
    text.append(mainText);
    let secondaryText = document.createElement("span");
    secondaryText.classList.add("square-secondaryText");
    secondaryText.innerText = listeners + " lst-s";
    text.append(secondaryText);
    let img = document.createElement("img");
    img.classList.add("square-image");
    img.src = image;
    searchSquare.append(img);
    searchSquare.append(text);
    div.append(searchSquare);
}

/**
 * Поиск альбомов
 * @param text - строка для поиска
 * @returns результат поиска альбомов
 */
async function searchAlbums(text) {
    try {
        let response = await fetch("https://ws.audioscrobbler.com/2.0/?method=album.search&api_key=7d42f21017e5fd6eb4e9e85c95ccd20f&format=json&limit=8&album=" + text);
        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error("Albums not received. Status: " + response.status);
        }
    } catch (err) {
        console.error(err);
    }
}

/**
 * Добавление альбома в раздел "Albums"
 * @param album - название альбома
 * @param name - автор
 * @param image - ссылка на изображение
 */
function addAlbum(album, name, image) {
    let div = document.getElementById("search-albums");
    let text = document.createElement("div");
    text.classList.add("square-text");
    let searchSquare = document.createElement("div");
    searchSquare.classList.add("search-square");
    let albumText = document.createElement("span");
    albumText.classList.add("square-mainText");
    albumText.innerText = album;
    text.append(albumText);
    let artistText = document.createElement("span");
    artistText.classList.add("square-secondaryText");
    artistText.innerText = name;
    text.append(artistText);
    let img = document.createElement("img");
    img.classList.add("square-image");
    img.src = image;
    searchSquare.append(img);
    searchSquare.append(text);
    div.append(searchSquare);
}

/**
 * @returns результат поиска трека
 * @param text - текст для поиска
 */
async function searchTracks(text) {
    try {
        let response = await fetch("https://ws.audioscrobbler.com/2.0/?method=track.search&api_key=7d42f21017e5fd6eb4e9e85c95ccd20f&format=json&limit=10&track=" + text);
        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error("Tracks not received. Status: " + response.status);
        }
    } catch (err) {
        console.error(err);
    }
}

/**
 * Добавление трека в раздел "Tracks"
 * @param name - название
 * @param artist - автор
 * @param image - ссылка на изображение
 */
function addTrack(name, artist, image) {
    let div = document.getElementById("search-list");
    let track = document.createElement("div");
    track.classList.add("search-track");
    let img = document.createElement("img");
    img.classList.add("search-track-img");
    img.src = image;
    let trackText = document.createElement("span");
    trackText.classList.add("search-trackName");
    trackText.innerText = name;
    let albumText = document.createElement("span");
    albumText.classList.add("search-artistName");
    albumText.innerText = artist;
    track.append(img);
    track.append(trackText);
    track.append(albumText);
    div.append(track);
}

/**
 * Поиск и отображение авторов по запросу
 */
async function findArtists(text) {
    let artistsSearch = await searchArtists(text);
    for (let i = 0; i < artistsSearch["results"]["artistmatches"]["artist"].length; i++) {
        addArtist(artistsSearch["results"]["artistmatches"]["artist"][i]["name"], artistsSearch["results"]["artistmatches"]["artist"][i]["listeners"], artistsSearch["results"]["artistmatches"]["artist"][i]["image"][2]["#text"]);
    }
}

/**
 * Поиск и отображение альбомов по запросу
 */
async function findAlbums(text) {
    let albumsSearch = await searchAlbums(text);
    for (let i = 0; i < albumsSearch["results"]["albummatches"]["album"].length; i++) {
        addAlbum(albumsSearch["results"]["albummatches"]["album"][i]["name"], albumsSearch["results"]["albummatches"]["album"][i]["artist"], albumsSearch["results"]["albummatches"]["album"][i]["image"][2]["#text"]);
    }
}

/**
 * Поиск и отображение треков по запросу
 */
async function findTracks(text) {
    let trackSearch = await searchTracks(text);
    for (let i = 0; i < trackSearch["results"]["trackmatches"]["track"].length; i++) {
        addTrack(trackSearch["results"]["trackmatches"]["track"][i]["name"], trackSearch["results"]["trackmatches"]["track"][i]["artist"], trackSearch["results"]["trackmatches"]["track"][i]["image"][2]["#text"]);
    }
}

let params = document.location.search;
let request;
if (params.indexOf("request=") === -1)
    request = "Drake";
else {
    request = params.substring(params.indexOf("request="))
    let index = request.indexOf("?");
    if (index === -1)
        request = request.substring(request.indexOf("=") + 1);
    else
        request = request.substring(request.indexOf("=") + 1, index);
}
document.getElementById("searchLabel").innerHTML = "Search results: " + request;
findArtists(request);
findAlbums(request);
findTracks(request);