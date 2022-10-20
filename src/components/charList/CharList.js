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
        error: false

    }

    marvelService = new MarvelService();


    onCharLoaded = (char) => {
        console.log(char);
        this.setState({
            char: char.map(item => {
                return ({
                    name: item.name,
                    thumbnail: item.thumbnail,
                    id: item.id
                })
            }),
            loading: false
        });
    }


    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
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

    loadingList = (char) => {
        return (char.map(({name, thumbnail, id}) => <ListItem name={name} thumbnail={thumbnail} key={id} onCharSelected={() => this.props.onCharSelected(id)}/>));
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate() {
        console.log(this.state.char)
    }

    render() {


        let {char, loading, error} = this.state;

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
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

function ListItem(props) {

    const {name, thumbnail, onCharSelected} = props;

    return (
    <li onClick={onCharSelected} className="char__item">
        <img src={thumbnail} alt="abyss"/>
        <div className="char__name">{name}</div>
    </li>
    )
}

export default CharList;