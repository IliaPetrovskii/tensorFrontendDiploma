import {useEffect, useState} from "react";
import {searchReq} from "../../api/api";
import {IText} from "../../types/text";

// Компонент поиска музыкантов по запросу
export const SearchArtists = ({text}: IText) => {
    const [artists, setArtists] = useState<any[]>([])
    const fetchData = async () => {
        const data = await searchReq("artist.search", `&format=json&limit=8&artist=${text}`)
        setArtists(data.results.artistmatches.artist)
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="search-artists" id="search-artists">
            {
                artists.map((artist, index) => (
                    <div className="search-square" key={index}>
                        <img className="square-image" src={artist.image[2]["#text"]}/>
                        <div className="square-text">
                            <span className="square-mainText">{artist.name}</span>
                            <span className="square-secondaryText">{artist.listeners} lst-s</span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}