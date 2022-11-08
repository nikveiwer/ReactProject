import { useParams, Link} from "react-router-dom"
import { useState, useEffect } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import AppBanner from "../appBanner/AppBanner";

import './singleComicPage.scss';


const SingleComicPage = (props) => {
    const {comicId} = useParams();

    const [comic, setComic] = useState(null);

    const {loading, error, getComic, getCharacter, clearError} = MarvelService();

    useEffect(() => {
        updateComic()
    }, [comicId])

    console.log(props.char);

    const updateComic = () => {


        clearError();

        if (props.char) {
            getCharacter(comicId)
                .then(onComicLoaded)
        } else {
            getComic(comicId)
                .then(onComicLoaded)
        }
    }


    const onComicLoaded = (comic) => {

        setComic(comic);
    }



    const errorMassage = error ? <ErrorMassage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} char={props.char}/> : null;


    return (
        <>
            {errorMassage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic, char}) => {
    const {thumbnail, name, price, pageCount, descr, language} = comic;

    const realDescr = descr ? descr : "there is no description yet"

    return (
        <>
            <AppBanner></AppBanner>
            <div className="single-comic">
                <img src={thumbnail} alt="x-men" className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{realDescr}</p>
                    {char ? null : (
                        <>
                            <p className="single-comic__descr">{pageCount}</p>
                            <p className="single-comic__descr">Language: {language}</p>
                            <div className="single-comic__price">{price}</div>
                        </>
                    )}
                </div>
                <Link to={char ? "/" : "/comics"} className="single-comic__back">{char ? "back to main" : "Back to all"}</Link>
            </div>
        </>
    )
}

export default SingleComicPage;