import React from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Features from "./components/Features.jsx";

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden text-white">
      <Navbar />
      <Hero />
      <About />
      <Features />
    </main>
  );
};
export default App;
