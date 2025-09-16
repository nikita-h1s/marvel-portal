import './comics-commercial.css';

import Avengers from '../../assets/Avengers.png';
import AvengersLogo from '../../assets/Avengers-logo.png';

const ComicsCommercial = () => {
    return (
        <div className="comics-gallery-commercial">
            <div className="comics-gallery-commercial-wrapper">
                <img src={Avengers} alt="Avengers"/>
                <h2 className="comics-gallery-commercial-title">New comics every week! <br/> Stay tuned!</h2>
            </div>
            <img src={AvengersLogo} alt="Avengers logo"/>
        </div>
    )
}

export default ComicsCommercial;