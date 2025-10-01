import './character-profile.css'

import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import Button from "../button/button";
import FindCharacterForm from "../find-character-form/find-character-form";
import setContent from "../../utils/setContent";

import useMarvelService from "../../services/marvel-service";
import {Link} from "react-router";

const CharacterProfile = (props) => {
    const [char, setChar] = useState(null);
    const [allComics, setAllComics] = useState([]);

    const {getCharacter, getAllComics,
        clearError, process, setProcess} = useMarvelService();

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
            .then(() => setProcess("confirmed"));
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    return (
        <div className="character-profile-form-wrapper">
            <div className="character-profile">
                {setContent(process, View, {char: char, allComics: allComics})}
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