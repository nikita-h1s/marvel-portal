import './character-element.css'

const CharacterElement = ({title, img, refCallback, ...props}) => {
    return (
        <div
            className="character-element"
            ref={refCallback}
            tabIndex={0}
            {...props}>
            <img src={img} alt={title}/>
            <div className="character-element-title">{title}</div>
        </div>
    )
}

export default CharacterElement