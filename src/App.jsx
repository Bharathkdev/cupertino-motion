import React from 'react'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import NavBar from "./components/NavBar.jsx";
import Hero from "./components/Hero.jsx";
import ProductViewer from "./components/ProductViewer.jsx";
import Showcase from "./components/Showcase.jsx";
import Performance from "./components/Performance.jsx";
import Features from "./components/Features.jsx";
import Highlights from "./components/Highlights.jsx";
import Footer from "./components/Footer.jsx";

// Register GSAP plugins globally so they can be used
// across all components without re-registering
gsap.registerPlugin(ScrollTrigger);

const App = () => {
    return (
        <main>
            <NavBar />
            <Hero />
            <ProductViewer />
            <Showcase />
            <Performance />
            <Features />
            <Highlights />
            <Footer />
        </main>
    )
};

export default App;
