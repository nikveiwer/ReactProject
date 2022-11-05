import { useState, useEffect, useRef } from "react";
import { Transition } from "react-transition-group"

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



    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)

        getAllCharacters(offset)
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
        onRequest(offset, true);
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
                    onClick={() => onRequest(offset, false)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )

}

function ListItem(props) {

    const [doAnimation, setDoAnimation] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setDoAnimation(true)
        }, 300)
    }, []);

    const {name, thumbnail, onCharSelected, focusSelectedElem, elemInUseNumber, selectedElem} = props;

    let listClass = elemInUseNumber == selectedElem ? "char__item char__item_selected" : "char__item";

    console.log(props);

    const duration = 300;

    const defaultStyle = {
        transition: `all ${duration}ms ease-in-out`,
        opacity: 0,
        visibility: "hidden"
    }

    const transitionStyles = {
        entering: { opacity: 1, visibility: "visible" },
        entered:  { opacity: 1, visibility: "visible" },
        exiting:  { opacity: 0, visibility: "hidden" },
        exited:  { opacity: 0, visibility: "hidden" },
    };

    return (
        <Transition
            in={doAnimation}
            timeout={duration}>
            {state => (
                    <li style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                        }}
                        onClick={() => {
                        onCharSelected();
                        focusSelectedElem()}}
                        className={listClass}
                    >
                        <img src={thumbnail} alt="abyss"/>
                        <div className="char__name">{name}</div>
                </li>
            )}


        </Transition>
    )
}

export default CharList;