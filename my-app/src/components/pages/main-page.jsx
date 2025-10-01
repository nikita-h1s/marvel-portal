import {useState} from "react";
import { Helmet } from "react-helmet";

import CharacterInfo from "../character-info/character-info.jsx";
import CharList from "../char-list/char-list.jsx";
import CharacterProfile from "../character-profile/character-profile.jsx";

const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id);
    }
    console.log('render main')

    return (
        <>
            <Helmet>
                <meta name="description" content="Marvel information portal"/>
                <title>Marvel Portal</title>
            </Helmet>
            <CharacterInfo/>
            <div className="character-wrapper">
                    <CharList onCharSelected={onCharSelected}/>
                    <CharacterProfile charId={selectedChar}/>
            </div>
        </>
    )
}

export default MainPage;