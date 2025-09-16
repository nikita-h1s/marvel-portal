import {useEffect, useState} from 'react';
import {Link} from 'react-router';

import './comics-gallery.css'

import ComicsCommercial from '../comics-commercial/comics-commercial.jsx'
import Button from '../button/button.jsx';
import useMarvelService from "../../services/marvel-service.jsx";
import Spinner from "../spinner/spinner.jsx";
import ErrorMessage from "../error-message/error-message.jsx";

const ComicsGallery = () => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, clearError, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)
    }, []);

    const onRequest = async (currentOffset, initial) => {
        clearError();
        if (!initial) setNewItemLoading(true);
        let ended = false;

        try {
            const newComics = await getAllComics(currentOffset);
            if (newComics.length < 8) {
                ended = true;
            }

            setComicsList(prevComics => [...prevComics, ...newComics]);
            setOffset(prevOffset => prevOffset + 8);
            setComicsEnded(comicsEnded => ended);
        } catch (e) {
            console.error(e);
        } finally {
            setNewItemLoading(false);
        }
    }

    const spinner = loading && !newItemLoading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    return (
        <>
            <ComicsCommercial/>
            <div className="comics-gallery">
                {spinner}
                {errorMessage}

                {comicsList.map((el) => (
                    <Link to={`/comics/${el.id}`} className="comics-gallery-item" key={el.id}>
                        <img src={el.thumbnail} alt=""/>
                        <div className="comics-gallery-item-title">
                            {el.title}
                        </div>
                        <div className="comics-gallery-item-price">{el.price} $</div>
                    </Link>
                ))}
            </div>
            <Button
                text="Load More"
                width={170}
                className="comics-gallery-btn"
                onClick={() => onRequest(offset)}
                style={{display: comicsEnded ? 'none' : 'inline-block'}}
                disabled={newItemLoading}
            />
        </>
    )
}

export default ComicsGallery;