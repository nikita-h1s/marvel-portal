import {useParams, Link} from "react-router";
import {useEffect, useState} from "react";

import './single-comic-page.css'
import Thor from '../../assets/Thor.jpg';
import ComicsCommercial from '../comics-commercial/comics-commercial.jsx';
import Spinner from '../spinner/spinner.jsx';
import ErrorMessage from '../error-message/error-message.jsx'

import useMarvelService from "../../services/marvel-service.jsx";

const SingleComicPage = () => {
    const [comics, setComics] = useState([]);

    const {comicId} = useParams();
    const {loading, error, clearError, getComics} = useMarvelService();

    useEffect(() => {
        updateComic(comicId);
    }, [comicId])

    const updateComic = async (id) => {
        clearError();

        try {
            const currentComics = await getComics(id);

            setComics(currentComics);
        } catch (error) {
            console.error(error);
        }
    }

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(loading || error || !comics) ? <View comics={comics}/> : null;

    return (
        <>
            <ComicsCommercial />
            {spinner}
            {errorMessage}
            {content}
        </>
    )
}

const View = ({comics}) => {
    const {thumbnail, title, description, page, language, price} = comics;

    return (
        <>
            <div className="single-comic-page-wrapper">
                <img src={thumbnail} alt={title}/>
                <div className="single-comic-page-info">
                    <h2>{title}</h2>
                    <p className="single-comic-page-paragraph">{description}</p>
                    <div className="single-comic-page-pages">{page}</div>
                    <div className="single-comic-page-language">Language: {language}</div>
                    <div className="single-comic-page-price">{price}$</div>
                </div>
                <Link to="/comics" className="single-comic-page-link">Back to all</Link>
            </div>
        </>
    )
}

export default SingleComicPage;
