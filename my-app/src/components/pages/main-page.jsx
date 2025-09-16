import {useState} from "react";

import CharacterInfo from "../character-info/character-info.jsx";
import CharList from "../char-list/char-list.jsx";
import CharacterProfile from "../character-profile/character-profile.jsx";

const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id);
    }

    return (
        <>
            <CharacterInfo/>
            <div className="character-wrapper">
                    <CharList onCharSelected={onCharSelected}/>
                    <CharacterProfile charId={selectedChar}/>
            </div>
        </>
    )
}

export default MainPage;