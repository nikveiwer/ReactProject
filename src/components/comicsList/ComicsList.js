import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';

import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';

const ComicsList = () => {

    const [comics, setComics] = useState([]);
    const [comicsListLoading, setComicsListLoading] = useState(true)
    const [offset, setOffset] = useState(null);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = MarvelService();

    const onRequest = (offset, initial) => {
        initial ? setComicsListLoading(true) : setComicsListLoading(false)

        getAllComics()
            .then(onComicsLoaded)

    }
    
    const onComicsLoaded = (newComics)  => {
        let ended = false;
        if (newComics < 9) {
            ended = true 
        }

        console.log(newComics);

        setComics(comics => [...comics, ...newComics])

        setComicsListLoading(false);
        setOffset(offset => (offset + 9));
        setComicsEnded(ended);
    }

    useEffect(() => {
        onRequest(offset, true)
    }, [])


    const loadingSpinner = comicsListLoading ? <Spinner></Spinner> : null
    const errorMassage = error ? <ErrorMassage/> : null;
    return (


        <div className="comics__list">
            <ul className="comics__grid">

                {loadingSpinner}
                {errorMassage}
                {comics.map((comic, i) => {
                    const {link, thumbnail, title, price, id} = comic;

                    return (
                        <li key={i} className="comics__item">
                        <Link to={`/comics/${id}`}>
                            <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                            <div className="comics__item-name">{title}</div>
                            <div className="comics__item-price">{price}$</div>
                        </Link>
                    </li>
                    )
                })}

            </ul>
            <button disabled={comicsListLoading} onClick={() => onRequest(offset, false)} style={{"display": comicsEnded ? "none" : "block"}} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;