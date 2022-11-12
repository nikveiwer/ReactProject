import { useState, useEffect } from "react";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMassage from "../errorMassage/ErrorMassage";


import './charList.scss';

const setListContent = (process, Component, data, newItemLoading) => {
    switch (process) {
        case "waiting":
            return <Spinner/>;
            break;
        case "loading":
            return newItemLoading ? <Component data={data}/> : <Spinner/>;
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


const CharList = (props) => {

    const [char, setChar] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    const [selectedElem, setSelectedElem] = useState(null);
    



    const {process, setProcess, getAllCharacters} = MarvelService();


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
            .then(() => setProcess("confirmed"))
    }




    const focusSelectedElem = (id) => {

        setSelectedElem(id);
    }



    const loadingList = ({data}) => {
        return (data.map((item) => <ListItem 
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



        // const errorMassage = error ? <ErrorMassage/> : null;
        // const spinner = loading && !newItemLoading ? <Spinner/> : null;
        // const content = !(loading || error) ? loadingList(char) : null;


        return (
            <div className="char__list">
                <ul className="char__grid">
                    {/* {errorMassage}
                    {spinner}
                    {loadingList(char)} */}
                    {setListContent(process, loadingList, char, newItemLoading)}
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


    const {name, thumbnail, onCharSelected, focusSelectedElem, elemInUseNumber, selectedElem} = props;

    let listClass = elemInUseNumber == selectedElem ? "char__item char__item_selected" : "char__item";



    return (

        <li
            onClick={() => {
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