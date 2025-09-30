import './single-page.css';

import ComicsCommercial from '../comics-commercial/comics-commercial.jsx';
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import useMarvelService from "../../services/marvel-service.jsx";
import Spinner from "../spinner/spinner.jsx";
import ErrorMessage from "../error-message/error-message.jsx";

const SinglePage = ({Component, dataType}) => {
    const [data, setData] = useState(null);

    const {id} = useParams();
    const {loading, error, clearError, getCharacter, getComics} = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id])

    const updateData = () => {
        clearError();

        switch (dataType) {
            case "character":
                getCharacter(id).then(onDataLoaded);
                break;
            case "comic":
                getComics(id).then(onDataLoaded);
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null;

    return (
        <>
            <ComicsCommercial/>
            <div className="single-page-content">
                {spinner}
                {errorMessage}
                {content}
            </div>
        </>
    )
}

export default SinglePage