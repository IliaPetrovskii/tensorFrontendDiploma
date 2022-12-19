import {useEffect, useState} from "react";
import {searchReq} from "../../api/api";
import {Genres} from "../Genres/Genres";

// Компонент для вывода популярных музыкантов
export const TopArtists = () => {
    const [topArtists, setTopArtists] = useState<any[]>([])
    const fetchData = async () => {
        const data = await searchReq("chart.gettopartists", "&limit=14&format=json")
        setTopArtists(data.artists.artist)
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="artists" id="artists">
            {
                topArtists.map((artist, index) => (
                    <div className="artist" key={index}>
                        <img className="artist-img" src={artist.image[2]["#text"]}/>
                        <span className="artist-nameOfArtist">{artist.name}</span>
                        <Genres method={"artist.gettoptags"}
                                req={`&format=json&artist=${artist.name.replaceAll('&', '%26')}`}/>
                    </div>
                ))
            }
        </div>
    )
}