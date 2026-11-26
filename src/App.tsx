import Nav from './components/Nav';
import Landing from './sections/Landing';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Landing />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
