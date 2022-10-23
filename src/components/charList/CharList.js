import { Component } from "react";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMassage from "../errorMassage/ErrorMassage";


import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {

    constructor(props) {
        super(props)
    }

    state = {

        char: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false,
        selectedElem: null
    }

    marvelService = new MarvelService();


    onCharLoaded = (newChar) => {
        let ended = false;
        if (newChar < 9) {
            ended = true 
        }

        this.setState(({char, offset}) => (
            {
                char: [...char, ...newChar],
                loading: false,
                newItemLoading: false,
                offset: offset + 9,
                charEnded: ended
            }
        ));
    }


    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelService
        .getAllCharacters(offset)
        .then(this.onCharLoaded)
        .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,
        })
    }

    updateChar = () => {

        this.setState({
            loading: true
        })

        this.marvelService
            .getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    focusSelectedElem = (id) => {
        this.setState({
            selectedElem: id
        })
    }



    loadingList = (char) => {
        return (char.map((item) => <ListItem 
                                        name={item.name} 
                                        thumbnail={item.thumbnail} 
                                        key={item.id} 
                                        onCharSelected={() => this.props.onCharSelected(item.id)}
                                        focusSelectedElem={() => this.focusSelectedElem(item.id)}
                                        elemInUseNumber={item.id}
                                        selectedElem={this.state.selectedElem}
                                    />));
    }

    componentDidMount() {
        this.updateChar();
    }


    render() {


        let {char, loading, error, newItemLoading, offset, charEnded} = this.state;

        const errorMassage = error ? <ErrorMassage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? this.loadingList(char) : null;


        return (
            <div className="char__list">
                <ul className="char__grid">
                    {errorMassage}
                    {spinner}
                    {content}
                </ul>
                <button
                    style={{"display": charEnded ? "none" : "block"}}
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
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