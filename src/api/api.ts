// Функция для получения данных
export async function searchReq(method: string, req: string = "") {
    const apiKey = "7d42f21017e5fd6eb4e9e85c95ccd20f";
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=${method}&api_key=${apiKey}&format=json${req}`);
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error("Search error. Status: " + response.status);
        }
    } catch (err) {
        alert(err);
    }
}