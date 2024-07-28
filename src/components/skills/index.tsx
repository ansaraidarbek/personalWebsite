import CB from '../shared-css-files/contentOuterBox.module.css'
import SP from './skills.module.css';

const SkillsSection = () => {
    return (
    <section id="skills" className={CB.outer}>
        <div className={CB.inner}>
            <div className={SP.inner}></div>
        </div>
    </section>
)};

export default SkillsSection;