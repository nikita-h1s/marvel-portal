import './character-profile.css'

import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import Button from "../button/button.jsx";
import Spinner from "../spinner/spinner.jsx";
import ErrorMessage from "../error-message/error-message.jsx";
import Skeleton from "../skeleton/skeleton.jsx";
import FindCharacterForm from "../find-character-form/find-character-form.jsx";

import useMarvelService from "../../services/marvel-service.jsx";
import {Link} from "react-router";

const CharacterProfile = (props) => {
    const [char, setChar] = useState(null);
    const [allComics, setAllComics] = useState([]);

    const {loading, error, getCharacter, getAllComics, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])

    useEffect(() => {
        const fetchComics = async () => {
            try {
                const data = await getAllComics();
                setAllComics(data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchComics();
    }, [])

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
    const content = !(loading || error || !char) ? <View char={char} allComics={allComics}/> : null;

    return (
        <div className="character-profile-form-wrapper">
            <div className="character-profile">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
            <FindCharacterForm/>
        </div>
    )
}

const View = ({char, allComics}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    const loadComicsList = (comics) => {
        if (!comics || comics.length === 0) {
            return "No comics found.";
        }

        const comicsList = comics.slice(0, 10).map((comic, i) => {
            const matchedComic = allComics.find(c => c.title === comic);

            if (matchedComic) {
                return (
                    <Link to={`/comics/${matchedComic.id}`} key={i} className="character-profile-comics-list__item">
                        {comic}
                    </Link>
                )
            } else {
                return (
                    <li key={i} className="character-profile-comics-list__item">
                        {comic}
                    </li>
                );
            }
        });

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