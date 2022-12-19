import {TopArtists} from "../TopArtists/TopArtists";
import {TopTracks} from "../TopTracks/TopTracks";

// Компонент главного содержания - вывода популярных музыкантов и треков
export const Main = () => {
    return (
        <main className="mainContent">
            <h1 className="musicLabel">Music</h1>
            <section className="mainSection">
                <h2 className="sectionLabel">Hot right now</h2>
                <hr className="short"/>
                <TopArtists/>
            </section>
            <section className="mainSection">
                <h2 className="sectionLabel">Popular tracks</h2>
                <hr className="short"/>
                <TopTracks/>
            </section>
        </main>
    );
}