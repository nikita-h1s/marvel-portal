import './char-list.css'

import {useState, useEffect, useRef} from 'react'
import ErrorMessage from "../error-message/error-message.jsx";
import Spinner from "../spinner/spinner.jsx";

import useMarvelService from "../../services/marvel-service.jsx";
import Button from "../button/button.jsx";
import CharacterElement from "../character-element/character-element.jsx";

import Ultron from "../../assets/ultron.png";

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters, clearError} = useMarvelService();

    // Invoked after content render
    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (currentOffset, initial) => {
        clearError();
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(currentOffset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (index) => {
        itemRefs.current.forEach(ref => {
            if (ref) ref.classList.remove('character-element-selected');
        });

        if (itemRefs.current[index]) {
            itemRefs.current[index].classList.add('character-element-selected');
            itemRefs.current[index].focus();
        }
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div>
            <div className="character-gallery">
                {spinner}
                {errorMessage}
                <View
                    charsArr={charList}
                    onCharSelected={props.onCharSelected}
                    onFocusItem={focusOnItem}
                    itemRefs={itemRefs}
                />
                <img className="ultron-img" src={Ultron} alt="Ultron"/>
            </div>
            <Button
                bgColor="red"
                text="Load More"
                width={169}
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'inline-block'}}
                onClick={() => onRequest(offset)}
            />
        </div>
    )
}

const View = ({charsArr, onCharSelected, onFocusItem, itemRefs}) => {
    return (
        charsArr.map((character, i) => (
            <CharacterElement
                key={character.id}
                img={character.thumbnail}
                title={character.name}
                refCallback={el => itemRefs.current[i] = el}
                onClick={() => {
                    onCharSelected(character.id);
                    onFocusItem(i);
                }}
            />
        ))
    )
}


export default CharList;