import { useParams, Link} from "react-router-dom";
import { Helmet } from "react-helmet";
import { useState, useEffect } from 'react';

import MarvelService from '../../services/MarvelService';
import setContent from "../../utils/setContent";

import AppBanner from "../appBanner/AppBanner";


import './singleComicPage.scss';


const SinglePage = (props) => {
    const {comicOrCharId} = useParams();

    const [comicOrChar, setComicOrChar] = useState(null);

    const {loading, error, process, setProcess, getComic, getCharacter, clearError} = MarvelService();

    useEffect(() => {
        updateComicOrChar()
    }, [comicOrCharId])


    const updateComicOrChar = () => {


        clearError();

        if (props.char) {
            getCharacter(comicOrCharId)
                .then(onComicOrCharLoaded)
                .then(() => setProcess("confirmed"))
        } else {
            getComic(comicOrCharId)
                .then(onComicOrCharLoaded)
                .then(() => setProcess("confirmed"))
        }
    }


    const onComicOrCharLoaded = (comicOrChar) => {

        setComicOrChar(comicOrChar);
    }



    // const errorMassage = error ? <ErrorMassage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error || !comic) ? <View data={{comic, char: props.char}}/> : null;


    return (
        <>
            {/* {errorMassage}
            {spinner}
            {content} */}
            {setContent(process, View, {comicOrChar, char: props.char})}
        </>
    )
}

const View = ({data: {comicOrChar, char}}) => {
    const {thumbnail, name, price, pageCount, descr, language} = comicOrChar;

    const realDescr = descr ? descr : "there is no description yet"

    return (
        <>  
            <Helmet>
                <meta
                    name="description"
                    content={`${name}  object`}
                />
                <title>{name}</title>
            </Helmet>

            <AppBanner></AppBanner>
            <div className="single-comic">
                <img style={char ? {"height": "300px"} : null} src={thumbnail} alt="x-men" className="single-comic__img"/>
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

export default SinglePage;