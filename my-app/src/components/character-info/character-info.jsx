import {Component, useEffect, useState} from "react";

import './character-info.css'

import ThorHummer from '../../assets/thor-hummer.png'

import Button from '../button/button.jsx'
import useMarvelService from "../../services/marvel-service.jsx";
import Spinner from "../spinner/spinner.jsx";
import ErrorMessage from "../error-message/error-message.jsx"

const CharacterInfo = () => {
    const [char, setChar] = useState({});

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * 20) + 1;
        getCharacter(id)
            .then(onCharLoaded);
    }

    const onCharUpdateClick = (e) => {
        e.preventDefault();

        updateChar();
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;

    return (
        <div className="character-info">
            <div className="character-info-description">
                {errorMessage}
                {spinner}
                {content}
            </div>
            <div className="character-info-random-character">
                <div className="character-info-random-character-titles-wrapper">
                    <h2>Random character for today!</h2>
                    <h2>Do you want to get to know him better?</h2>
                </div>
                <h2 className="character-info-random-character-third-title">Or choose another one</h2>
                <Button onClick={onCharUpdateClick} text="Try it" bgColor="red"/>
                <img src={ThorHummer} alt="Thor Hummer" className="character-info-random-character-img"/>
            </div>
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;

    return (
        <>
            <img src={thumbnail} alt="Character image"/>
            <div className="character-info-description-wrapper">
                <h2 className="character-info-description-title">{name}</h2>
                <p className="character-info-description-text">
                    {description ? description : 'No info about the character.'}
                </p>
                <div className="character-info-description-btn-wrapper">
                    <a href={homepage}>
                        <Button text="Homepage" bgColor="red"/>
                    </a>
                    <a href={wiki}>
                        <Button text="Wiki" bgColor="gray"/>
                    </a>
                </div>
            </div>
        </>
    )
}

CharacterInfo.propTypes = {}

export default CharacterInfo