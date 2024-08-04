import './App.css';
import {useRef, useEffect, useState } from 'react';
import NavigatorBar from './components/navigator-bar';
import AboutMeSection from './components/about-me';
import JourneySection from './components/journey';
import SkillsSection from './components/skills';
import ProjectsSection from './components/projects';
import ContactInformation from './components/contacts';
import { changeDevice } from './state/deviceType/deviceTypeSlice';
import { useDispatch } from 'react-redux';
import { changeFontSize } from './state/fontSize/fontSizeSlice';

function App() {

  const contentRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  // if font size is needed
  // const findFontSize = useCallback(() => {
  //   const el = document.documentElement;
  //   const style = window.getComputedStyle(el, null).getPropertyValue('font-size');
  //   const fontSize = parseFloat(style);
  //   return fontSize ? fontSize : 16;
  // }, [])

  // let fontSize:number = useMemo(() => findFontSize(), []);

  // const changeFontSize = useCallback(() => {
  //   fontSize = findFontSize();
  // }, [])


  useEffect(() => {
      const checkPage = () => {
        dispatch(changeDevice());
        dispatch(changeFontSize());
      };
      window.addEventListener('resize', checkPage);
      return () => {
          window.removeEventListener('resize', checkPage);
      };
  }, []);


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
