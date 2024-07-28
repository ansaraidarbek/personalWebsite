import './App.css';
import { useRef } from 'react'
import NavigatorBar from './components/navigator-bar';
import AboutMeSection from './components/about-me';
import JourneySection from './components/journey';
import SkillsSection from './components/skills';
import ProjectsSection from './components/projects';
import ContactInformation from './components/contacts';

function App() {

  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <div ref = {contentRef} className="App">
      <NavigatorBar contentRef = {contentRef}/>
      <main className="main">
        <AboutMeSection/>
        <SkillsSection/>
        <JourneySection/>
        <ProjectsSection/>
      </main>
      <ContactInformation/>
    </div>
  );
}

export default App;
