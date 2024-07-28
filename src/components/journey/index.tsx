import CB from '../shared-css-files/contentOuterBox.module.css'
import JP from './journey.module.css';

const JourneySection = () => {
    return (
    <section id="journey" className={CB.outer}>
        <div className={CB.inner}>
            <div className={JP.inner}></div>
        </div>
    </section>
)};

export default JourneySection;