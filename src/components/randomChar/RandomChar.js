import { useState, useEffect } from "react"
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMassage from "../errorMassage/ErrorMassage";
import setContent from "../../utils/setContent";

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {


    const [char, setChar] = useState({});


    const {loading, error, process, setProcess, getCharacter, clearError} = MarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }


    const updateChar = () => {
        clearError();

        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess("confirmed"));
    }


    useEffect(() => {
        updateChar();
    }, []);



    // const errorMassage = error ? <ErrorMassage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error) ? <View char={char}/> : null;


    return (
        <div className="randomchar">
            {/* {errorMassage}
            {spinner}
            {content} */}
            {setContent(process, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )

}

const View = ({data}) => {

    const {name, descr, thumbnail, homepage, wiki} = data;
    let realDescr

    if (typeof(descr) == "string" && descr.length >= 230 ) {
        realDescr = descr.slice(0, 227) + "..."
     }
     
    realDescr = descr ? descr : "there is no description yet"

    return (
        <div className="randomchar__block">
        <img src={thumbnail} alt="Random character" className="randomchar__img"/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {realDescr}
            </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    )
}

export default RandomChar;