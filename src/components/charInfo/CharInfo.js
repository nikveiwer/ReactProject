import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import Skeleton from "../skeleton/Skeleton"

import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';

class CharInfo extends Component {

    state = {

        char: null,
        loading: false,
        error: false

    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps, precState) {
        if (this.props.charId != prevProps.charId) {
            this.updateChar()
        }
    }

    updateChar = () => {
        const {charId} = this.props
        if (!charId) {
            return;
        }

        this.setState({
            loading: true
        })

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }


    onCharLoaded = (char) => {
        this.setState({
            char: char,
            loading: false
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    render() {

        const {char, loading, error} = this.state

        const skeleton = char || loading || error ? null : <Skeleton/>
        const errorMassage = error ? <ErrorMassage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char} changeComicsList={this.changeComicsList}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMassage}
                {spinner}
                {content}
            </div>
        )

    }
}


const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;



    return (
       <>
       <div className="char__basics">
                    <img src={thumbnail} alt="abyss"/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">

                    {
                    comics.length == 0 ? "there is no comics yet" :
                    comics.map((i, key) => {
                        // eslint-disable-next-line
                        if (key > 9) {
                            return
                        }                    
                        return (
                            <li key={key} className="char__comics-item">
                                {i.name}
                            </li>
                        )
                    })
                    }

                </ul>

       </> 
    )
}

export default CharInfo;