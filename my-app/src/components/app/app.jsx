import './app.css'

import {useState} from "react";

import Header from '../header/header.jsx';
import CharacterInfo from '../character-info/character-info.jsx';
import CharacterProfile from "../character-profile/character-profile.jsx";
import CharList from '../char-list/char-list.jsx';
import ErrorBoundary from '../error-boundary/error-boundary.jsx';
import ComicsGallery from '../comics-gallery/comics-gallery.jsx';


const App = () => {
    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id);
    }

    return (
        <div className="app">
            <Header/>

            <ErrorBoundary>
                <CharacterInfo/>
            </ErrorBoundary>
            <div className="character-wrapper">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharacterProfile charId={selectedChar}/>
                </ErrorBoundary>
            </div>
            {/*<ComicsGallery/>*/}
        </div>
    )
}

export default App