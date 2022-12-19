import search from './search.png';
import {SearchArtists} from "../SearchArtists/SearchArtists";
import {SearchAlbums} from "../SearchAlbums/SearchAlbums";
import {SearchTracks} from "../SearchTracks/SearchTracks";

// Компонент главного содержания - поиска трека
export const Search = () => {
    const params = new URLSearchParams(window.location.search)
    let request = params.get("request");
    let noSearchLabel;
    let searchLabel = <h1 className="searchLabel" id="searchLabel">Search results</h1>;
    let searchArtists, searchAlbums, searchTracks;
    if ((request === null) || (request.trim() === "")) {
        noSearchLabel = <label className="search-label">Please enter your non-empty request</label>
    } else {
        searchLabel = <h1 className="searchLabel" id="searchLabel">Search results: {request}</h1>;
        searchArtists = <SearchArtists text={request}/>;
        searchAlbums = <SearchAlbums text={request}/>
        searchTracks = <SearchTracks text={request}/>
    }
    return (
        <main className="searchContent">
            {searchLabel}
            <div id="searchForm">
                <form method="get" action="/search" className="searchBar">
                    <input id="searchBar" name='request' type="search" className="searchTerm"
                           placeholder="What are you looking for?"/>
                    <button type="submit" className="searchButton">
                        <img src={search} className="searchBar-img" alt="search"/>
                    </button>
                </form>
                {noSearchLabel}
            </div>
            <section className="searchSection">
                <h2 className="sectionLabel">Artists</h2>
                {searchArtists}
            </section>
            <section className="searchSection">
                <h2 className="sectionLabel">Albums</h2>
                {searchAlbums}
            </section>
            <section className="searchSection">
                <h2 className="sectionLabel">Tracks</h2>
                {searchTracks}
            </section>
        </main>
    );
}