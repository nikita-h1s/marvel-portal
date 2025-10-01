import ComicsGallery from "../comics-gallery/comics-gallery.jsx";
import {Helmet} from "react-helmet";

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta name="description" content="Page with a list of the comics"/>
                <title>Comics Page</title>
            </Helmet>
            <ComicsGallery/>
        </>
    )
}

export default ComicsPage;