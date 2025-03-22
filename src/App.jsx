import React from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-stone-600">
      <Navbar />
      <Hero />
      <About />
    </main>
  );
};
export default App;
