import {useEffect, useState} from "react";
import {searchReq} from "../../api/api";
import {IText} from "../../types/text";

// Компонент поиска альбомов по запросу
export const SearchAlbums = ({text}: IText) => {
    const [albums, setAlbums] = useState<any[]>([])
    const fetchData = async () => {
        const data = await searchReq("album.search", `&format=json&limit=8&album=${text}`)
        setAlbums(data.results.albummatches.album)
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="search-albums" id="search-albums">
            {
                albums.map((album, index) => (
                    <div className="search-square" key={index}>
                        <img className="square-image" src={album.image[2]["#text"]}/>
                        <div className="square-text">
                            <span className="square-mainText">{album.name}</span>
                            <span className="square-secondaryText">{album.artist}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}