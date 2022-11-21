/**
 * Добавление автора в раздел "Hot right now"
 * @param name - автор
 * @param tags - жанры
 * @param image - изображение
 * @returns результат поиска авторов музыки
 */
function addTopArtist(name, tags, image) {
    let div = document.getElementById("artists");
    let artist = document.createElement("div");
    artist.classList.add("artist");
    let img = document.createElement("img");
    img.classList.add("artist-img");
    img.src = image;
    artist.append(img);
    let nameOfArtist = document.createElement("span");
    nameOfArtist.classList.add("artist-nameOfArtist")
    nameOfArtist.innerText = name;
    artist.append(nameOfArtist);
    let genres = document.createElement("span");
    genres.classList.add("genres")
    genres.innerText = tags;
    artist.append(genres);
    div.append(artist);
}

/**
 * Поиск известных авторов музыки
 * @returns результат поиска авторов музыки
 */
async function searchTopArtists() {
    try {
        let response = await fetch("https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=7d42f21017e5fd6eb4e9e85c95ccd20f&limit=14&format=json");
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
 * Поиск жанров характерных для автора
 * @param text - строка для поиска жанров
 * @returns результат поиска жанров
 */
async function searchTagsOfArtist(text) {
    try {
        let response = await fetch("https://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&api_key=7d42f21017e5fd6eb4e9e85c95ccd20f&format=json&artist=" + text);
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
 * Добавление автора в раздел "Popular tracks"
 * @param song - название трека
 * @param artist - автор
 * @param tags - жанры
 * @param image - изображение
 * @returns результат поиска авторов музыки
 */
function addTopTrack(song, artist, tags, image) {
    let div = document.getElementById("tracks");
    let track = document.createElement("div");
    track.classList.add("track");
    let img = document.createElement("img");
    img.classList.add("track-img");
    img.src = image;
    track.append(img);
    let trackInfo = document.createElement("div");
    trackInfo.classList.add("trackInfo");
    let songText = document.createElement("span");
    songText.classList.add("track-nameOfSong");
    songText.innerText = song;
    trackInfo.append(songText);
    let artistText = document.createElement("span");
    artistText.classList.add("track-nameOfArtist");
    artistText.innerText = artist;
    trackInfo.append(artistText);
    let tagsText = document.createElement("span");
    tagsText.classList.add("genres");
    tagsText.innerText = tags;
    trackInfo.append(tagsText);
    track.append(trackInfo);
    div.append(track);
}

/**
 * Поиск популярных треков музыки
 * @returns результат поиска треков
 */
async function searchPopularTracks() {
    try {
        let response = await fetch("https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=7d42f21017e5fd6eb4e9e85c95ccd20f&format=json&limit=15");
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
 * Поиск жанров трека
 * @param song - название трека
 * @param artist - автор
 * @returns результат поиска жанров
 */
async function searchTagsOfTrack(song, artist) {
    try {
        let response = await fetch("https://ws.audioscrobbler.com/2.0/?method=track.gettoptags&api_key=7d42f21017e5fd6eb4e9e85c95ccd20f&format=json&artist="
            + artist + "&track=" + song);
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
 * Поиск и отображение известных авторов
 */
async function findTopArtists() {
    let artistsSearch = await searchTopArtists();
    for (let i = 0; i < artistsSearch["artists"]["artist"].length; i++) {
        let name = artistsSearch["artists"]["artist"][i]["name"];
        let image = artistsSearch["artists"]["artist"][i]["image"][2]["#text"];
        let tagsReq = await searchTagsOfArtist(name);
        let length = tagsReq["toptags"]["tag"].length;
        if (length > 3) length = 3;
        let tags = [];
        for (let j = 0; j < length; j++) {
            tags.push(tagsReq["toptags"]["tag"][j]["name"]);
        }
        addTopArtist(name, tags.toString().replace(new RegExp(",", 'g'), " · "), image);
    }
}

/**
 * Поиск и отображение наиболее популярных треков
 */
async function findTopTracks() {
    let tracksSearch = await searchPopularTracks();
    for (let i = 0; i < tracksSearch["tracks"]["track"].length; i++) {
        let song = tracksSearch["tracks"]["track"][i]["name"];
        let artist = tracksSearch["tracks"]["track"][i]["artist"]["name"];
        let image = tracksSearch["tracks"]["track"][i]["image"][2]["#text"];
        let tagsReq = await searchTagsOfTrack(song, artist);
        let length = tagsReq["toptags"]["tag"].length;
        if (length > 3) length = 3;
        let tags = [];
        for (let j = 0; j < length; j++) {
            tags.push(tagsReq["toptags"]["tag"][j]["name"]);
        }
        addTopTrack(song, artist, tags.toString().replace(new RegExp(",", 'g'), " · "), image);
    }
}

findTopArtists()
findTopTracks()