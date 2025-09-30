import './single-char-layout.css'

const SingleCharLayout = ({data}) => {
    const {name, thumbnail, description} = data;

    return (
        <div className="single-char-page-wrapper">
            <img src={thumbnail} alt={name}/>
            <div className="single-char-page-info">
                <h2>{name}</h2>
                <p className="single-char-page-paragraph">{description}</p>
            </div>
        </div>
    )
}

export default SingleCharLayout;