import {useEffect, useState} from "react";
import {searchReq} from "../../api/api";
import {IText} from "../../types/text";

// Компонент поиска треков по запросу
export const SearchTracks = ({text}: IText) => {
    const [tracks, setTracks] = useState<any[]>([])
    const fetchData = async () => {
        const data = await searchReq("track.search", `&format=json&limit=10&track=${text}`)
        setTracks(data.results.trackmatches.track)
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="search-list" id="search-list">
            {
                tracks.map((track, index) => (
                    <div className="search-track" key={index}>
                        <img className="search-track-img" src={track.image[2]["#text"]}/>
                        <span className="search-trackName">{track.name}</span>
                        <span className="search-artistName">{track.artist}</span>
                    </div>
                ))
            }
        </div>
    )
}