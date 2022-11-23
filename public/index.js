/**
 * Добавление автора в раздел "Hot right now"
 * @param name - автор
 * @param tags - жанры
 * @param image - изображение
 * @returns результат поиска авторов музыки
 */
function addTopArtist(name, tags, image) {
    const div = document.getElementById("artists");
    const artist = document.createElement("div");
    artist.classList.add("artist");
    const img = document.createElement("img");
    img.classList.add("artist-img");
    img.src = image;
    artist.append(img);
    const nameOfArtist = document.createElement("span");
    nameOfArtist.classList.add("artist-nameOfArtist")
    nameOfArtist.innerText = name;
    artist.append(nameOfArtist);
    const genres = document.createElement("span");
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
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${apiKey}&limit=14&format=json`);
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error("Top artists not received. Status: " + response.status);
        }
    } catch (err) {
        alert(err);
    }
}

/**
 * Поиск жанров характерных для автора
 * @param text - строка для поиска жанров
 * @returns результат поиска жанров
 */
async function searchTagsOfArtist(text) {
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&api_key=${apiKey}&format=json&artist=${text}`);
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error("Tags of artist not received. Status: " + response.status);
        }
    } catch (err) {
        alert(err);
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
    const div = document.getElementById("tracks");
    const track = document.createElement("div");
    track.classList.add("track");
    const img = document.createElement("img");
    img.classList.add("track-img");
    img.src = image;
    track.append(img);
    const trackInfo = document.createElement("div");
    trackInfo.classList.add("trackInfo");
    const songText = document.createElement("span");
    songText.classList.add("track-nameOfSong");
    songText.innerText = song;
    trackInfo.append(songText);
    const artistText = document.createElement("span");
    artistText.classList.add("track-nameOfArtist");
    artistText.innerText = artist;
    trackInfo.append(artistText);
    const tagsText = document.createElement("span");
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
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${apiKey}&format=json&limit=15`);
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error("Popular tracks not received. Status: " + response.status);
        }
    } catch (err) {
        alert(err);
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
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.gettoptags&api_key=${apiKey}&format=json&artist=${artist}&track=${song}`);
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error("Tags of track not received. Status: " + response.status);
        }
    } catch (err) {
        alert(err);
    }
}

/**
 * Поиск и отображение известных авторов
 */
async function findTopArtists() {
    const artistsSearch = await searchTopArtists();
    const artist = artistsSearch.artists.artist;
    for (let i = 0; i < artist.length; i++) {
        const name = artist[i].name;
        const image = artist[i].image[2]["#text"];
        const tagsReq = await searchTagsOfArtist(name);
        const tags = tagsReq.toptags.tag;
        let length = tags.length;
        if (length > 3) length = 3;
        const tagsArray = [];
        for (let j = 0; j < length; j++) {
            tagsArray.push(tags[j].name);
        }
        addTopArtist(name, tagsArray.join(" · "), image);
    }
}

/**
 * Поиск и отображение наиболее популярных треков
 */
async function findTopTracks() {
    const tracksSearch = await searchPopularTracks();
    const tracks = tracksSearch.tracks.track;
    for (let i = 0; i < tracks.length; i++) {
        const song = tracks[i].name;
        const artist = tracks[i].artist.name;
        const image = tracks[i].image[2]["#text"];
        const tagsReq = await searchTagsOfTrack(song, artist);
        const tags = tagsReq.toptags.tag;
        let length = tags.length;
        if (length > 3) length = 3;
        const tagsArray = [];
        for (let j = 0; j < length; j++) {
            tagsArray.push(tags[j].name);
        }
        addTopTrack(song, artist, tagsArray.join(" · "), image);
    }
}

const apiKey = "7d42f21017e5fd6eb4e9e85c95ccd20f";
findTopArtists()
findTopTracks()