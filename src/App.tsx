import './App.css';
import NavigatorBar from './components/navigator-bar';

function App() {
  return (
    <div className="App">
      <NavigatorBar/>
      <div className="main">
        <section id="about_me" className="content">Hello from first<div></div></section>
        <section id="skills" className="content">Hello from second<div></div></section>
        <section id="journey" className="content">Hello from third<div></div></section>
        <section id="projects" className="content">Hello from fourth<div></div></section>
      </div>
    </div>
  );
}

export default App;
