import React from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Features from "./components/Features.jsx";
import Story from "./components/Story.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden text-white">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex="-1" aria-label="Main content">
        <Hero />
        <About />
        <Features />
        <Story />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};
export default App;
