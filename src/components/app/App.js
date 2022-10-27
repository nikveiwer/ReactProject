import { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBanner from "../appBanner/AppBanner";

import decoration from '../../resources/img/vision.png';
import ComicsList from "../comicsList/ComicsList";

const  App = () => {

    const [selectedChar, setChar] = useState(null);


    const onCharSelected = (id) => {
        setChar(id);
    }


    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/* <RandomChar/>
                <div className="char__content">
                    <CharList onCharSelected={onCharSelected}/>
                    <CharInfo charId={selectedChar}/>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/> */}

                <AppBanner></AppBanner>
                <ComicsList></ComicsList>
            </main>
        </div>
    )

}

export default App;