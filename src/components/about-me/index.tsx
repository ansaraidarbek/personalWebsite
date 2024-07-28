import CB from '../shared-css-files/contentOuterBox.module.css'
import AM from './aboutMe.module.css';

const AboutMeSection = () => {
    return (
    <section id="about_me" className={CB.outer}>
        <div className={CB.inner}>
            <div className={AM.inner}></div>
        </div>
    </section>
)};

export default AboutMeSection;