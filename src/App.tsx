import { MotionConfig } from 'framer-motion';
import Nav from './components/Nav';
import Divider from './components/Divider';
import Footer from './components/Footer';
import Landing from './sections/Landing';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

export default function App() {
  return (
    // reducedMotion="user": Framer Motion drops transform animations when the OS asks for reduced motion.
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#about">Skip to content</a>
      <Nav />
      <main>
        <Landing />
        <About />
        <Divider />
        <Skills />
        <Divider />
        <Projects />
        <Divider />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
