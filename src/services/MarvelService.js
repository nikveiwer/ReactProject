import { useHttp } from "../hooks/http.hook"

const MarvelService = () => {

    const _apiBase = `https://gateway.marvel.com:443/v1/public/`;
    const _apiKey = `apikey=7f05223a4be737d9b018fe7e80f41d58`;
    const _baseOffset = 210;

    const {loading, error, request, clearError} = useHttp();


    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(char => {
            return _transformCharacter(char)
        })
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)

        return res.data.results.map(comic => {
            return _transformComic(comic)
        })
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?&${_apiKey}`);
        return _transformCharacter(res.data.results[0]);

    }


    const _transformCharacter = (char) => {

        return {
            name: char.name,
            descr: char.description,
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
    }


    const _transformComic = (comic) => {

        return {
            link: comic.urls[0].url,
            thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,
            title: comic.title,
            price: comic.prices.price
        }
    }


    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics}
}

export default MarvelService;