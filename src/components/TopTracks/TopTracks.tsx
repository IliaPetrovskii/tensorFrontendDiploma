import {useEffect, useState} from "react";
import {searchReq} from "../../api/api";
import {Genres} from "../Genres/Genres";

// Компонент для вывода популярных треков
export const TopTracks = () => {
    const [topTracks, setTopTracks] = useState<any[]>([])
    const fetchData = async () => {
        const data = await searchReq("chart.gettoptracks", "&format=json&limit=15")
        setTopTracks(data.tracks.track)
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="tracks" id="track">
            {
                topTracks.map((track, index) => (
                    <div className="track" key={index}>
                        <img className="track-img" src={track.image[2]["#text"]}/>
                        <div className="trackInfo">
                            <span className="track-nameOfSong">{track.name}</span>
                            <span className="track-nameOfArtist">{track.artist.name}</span>
                            <Genres method={"track.gettoptags"}
                                    req={`&format=json&artist=${track.artist.name.replaceAll('&', '%26')}&track=${track.name.replaceAll('&', '%26')}`}/>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}