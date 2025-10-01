import './single-page.css';

import ComicsCommercial from '../comics-commercial/comics-commercial.jsx';
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import useMarvelService from "../../services/marvel-service.jsx";
import setContent from "../../utils/setContent.jsx";

const SinglePage = ({Component, dataType}) => {
    const [data, setData] = useState(null);

    const {id} = useParams();
    const {clearError, getCharacter, getComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id])

    const updateData = () => {
        clearError();

        switch (dataType) {
            case "character":
                getCharacter(id)
                    .then(onDataLoaded)
                    .then(() => setProcess("confirmed"));
                break;
            case "comic":
                getComics(id)
                    .then(onDataLoaded)
                    .then(() => setProcess("confirmed"));
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    return (
        <>
            <ComicsCommercial/>
            <div className="single-page-content">
                {setContent(process, Component, {data: data})}
            </div>
        </>
    )
}

export default SinglePage