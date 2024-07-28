import './App.css';
import { useRef } from 'react'
import NavigatorBar from './components/navigator-bar';
import AboutMe from './components/about-me';

function App() {

  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <div ref = {contentRef} className="App">
      <NavigatorBar contentRef = {contentRef}/>
      <div className="main">
        <AboutMe/>
        <section id="skills" className="content">Hello from second<div></div></section>
        <section id="journey" className="content">Hello from third<div></div></section>
        <section id="projects" className="content">Hello from fourth<div></div></section>
      </div>
    </div>
  );
}

export default App;
