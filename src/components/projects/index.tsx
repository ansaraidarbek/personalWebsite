import CB from '../shared-css-files/contentOuterBox.module.css';
import PP from './projects.module.css';

const ProjectsSection = () => {
    return (
    <section id="projects" className={CB.outer}>
        <div className={CB.inner}>
            <div className={PP.inner}></div>
        </div>
    </section>
)};

export default ProjectsSection;