import {Link} from "react-router";
import {Helmet} from "react-helmet";

import './single-comic-page.css'

const SingleComicPage = ({data}) => {
    const {thumbnail, title, description, page, language, price} = data;

    return (
        <div className="single-comic-page-wrapper">
            <Helmet>
                <meta name="description" content={`${title} comics book`}/>
                <title>{title}</title>
            </Helmet>
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
    )
}

export default SingleComicPage;
