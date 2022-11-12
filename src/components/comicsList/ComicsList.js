import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';

import './comicsList.scss';

const setComicsContent = (process, Component, data, comicsListLoading) => {
    switch (process) {
        case "waiting":
            return <Spinner/>;
            break;
        case "loading":
            return comicsListLoading ? <Component data={data}/> : <Spinner/>;
            break;
        case "confirmed":
            return <Component data={data}/>;
            break;
        case "error":
            return <ErrorMassage/>;
            break;
        default:
            throw new Error("Unexpected process state")
        
    }
}

const ComicsList = () => {

    const [comics, setComics] = useState([]);
    const [comicsListLoading, setComicsListLoading] = useState(true)
    const [offset, setOffset] = useState(null);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {process, setProcess, getAllComics} = MarvelService();

    const onRequest = (offset, initial) => {
        initial ? setComicsListLoading(true) : setComicsListLoading(false)

        getAllComics()
            .then(onComicsLoaded)
            .then(setProcess("confirmed"))

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

    const loadingComics = ({data}) => {
       return data.map((comic, i) => {
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
        })
    }


    // const loadingSpinner = comicsListLoading ? <Spinner></Spinner> : null
    // const errorMassage = error ? <ErrorMassage/> : null;
    return (


        <div className="comics__list">
            <ul className="comics__grid">

                {/* {loadingSpinner}
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
                })} */}
                    

                {setComicsContent(process, loadingComics, comics, comicsListLoading)}

            </ul>
            <button disabled={comicsListLoading} onClick={() => onRequest(offset, false)} style={{"display": comicsEnded ? "none" : "block"}} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;