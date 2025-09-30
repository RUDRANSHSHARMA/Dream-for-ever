import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Resume from '../components/Resume';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <main>
      <Hero />
      <About />
      <Resume />
      <Projects />
      <Contact />
    </main>
  );
};

export default Home;
