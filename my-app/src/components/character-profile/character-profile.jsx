import './character-profile.css'

import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import Button from "../button/button.jsx";
import Spinner from "../spinner/spinner.jsx";
import ErrorMessage from "../error-message/error-message.jsx";
import Skeleton from "../skeleton/skeleton.jsx";

import useMarvelService from "../../services/marvel-service.jsx";

const CharacterProfile = (props) => {
    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="character-profile">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    const loadComicsList = (comics) => {
        if (comics.length === 0) {
            return "No comics found.";
        }

        const comicsList = comics.slice(0, 10).map((comic, i) => (
            <li key={i} className="character-profile-comics-list__item">
                {comic}
            </li>
        ))

        if (comics.length > 10) {
            comicsList.push(
                <li key="more" className="character-profile-comics-list__item more">
                    and more {comics.length - 10}...
                </li>
            )
        }

        return comicsList;
    }

    return (
        <>
            <div className="character-profile-wrapper">
                <img src={thumbnail} alt={name}/>
                <div className="character-profile-title-wrapper">
                    <h2 className="character-profile-title">{name}</h2>
                    <div className="character-profile-btn-wrapper">
                        <a href={homepage}>
                            <Button text="Homepage" bgColor="red"/>
                        </a>
                        <a href={wiki}>
                            <Button text="Wiki" bgColor="gray"/>
                        </a>
                    </div>
                </div>
            </div>
            <p className="character-profile-text">
                {description}
            </p>
            <div className="character-profile-comics">
                <h2>Comics:</h2>
                <ul className="character-profile-comics-list">
                    {loadComicsList(comics)}
                </ul>
            </div>
        </>
    )
}

CharacterProfile.propTypes = {
    charId: PropTypes.string,
}

export default CharacterProfile