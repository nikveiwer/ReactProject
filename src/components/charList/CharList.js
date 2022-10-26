import { useState, useEffect, useRef } from "react";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMassage from "../errorMassage/ErrorMassage";


import './charList.scss';

const CharList = (props) => {

    const [char, setChar] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    const [selectedElem, setSelectedElem] = useState(null);



    const {loading, error, getAllCharacters} = MarvelService();


    const onCharLoaded = (newChar) => {
        let ended = false;
        if (newChar < 9) {
            ended = true 
        }


        setChar((char) => [...char, ...newChar]);
        setNewItemLoading(false);
        setOffset(offset => (offset + 9));
        setCharEnded(ended);
    }



    const onRequest = (offset) => {

        setNewItemLoading(true)

        getAllCharacters(offset)
            .then(onCharLoaded)
    }



    const updateChar = () => {


        getAllCharacters()
            .then(onCharLoaded)
    }

    const focusSelectedElem = (id) => {

        setSelectedElem(id);
    }



    const loadingList = (char) => {
        return (char.map((item) => <ListItem 
                                        name={item.name} 
                                        thumbnail={item.thumbnail} 
                                        key={item.id} 
                                        onCharSelected={() => props.onCharSelected(item.id)}
                                        focusSelectedElem={() => focusSelectedElem(item.id)}
                                        elemInUseNumber={item.id}
                                        selectedElem={selectedElem}
                                    />));
    }

    useEffect(() => {
        updateChar();
    }, [])



        const errorMassage = error ? <ErrorMassage/> : null;
        const spinner = loading && !newItemLoading ? <Spinner/> : null;
        // const content = !(loading || error) ? loadingList(char) : null;


        return (
            <div className="char__list">
                <ul className="char__grid">
                    {errorMassage}
                    {spinner}
                    {loadingList(char)}
                </ul>
                <button
                    style={{"display": charEnded ? "none" : "block"}}
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )

}

function ListItem(props) {

    const {name, thumbnail, onCharSelected, focusSelectedElem, elemInUseNumber, selectedElem} = props;

    let listClass = elemInUseNumber == selectedElem ? "char__item char__item_selected" : "char__item";

    return (
    <li onClick={() => {
        onCharSelected();
        focusSelectedElem()}}
        className={listClass}
    >
        <img src={thumbnail} alt="abyss"/>
        <div className="char__name">{name}</div>
    </li>
    )
}

export default CharList;