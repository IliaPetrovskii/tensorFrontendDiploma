import {useEffect, useState} from "react";
import {searchReq} from "../../api/api";

interface NameProps {
    method: string;
    req: string;
}

// Компонент для вывода тегов
export const Genres = ({method, req}: NameProps) => {
    const [tags, setTags] = useState<any[]>([])
    const fetchData = async () => {
        const data = await searchReq(method, req)
        setTags(data.toptags.tag)
    }
    useEffect(() => {
        fetchData()
    }, [])
    let length = tags.length;
    if (length > 3) length = 3;
    const tagsArray = [];
    for (let j = 0; j < length; j++) {
        tagsArray.push(tags[j].name);
    }
    return (
        <span className="genres">{tagsArray.join(" · ")}</span>
    )
}