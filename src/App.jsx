import React from 'react'
import NavBar from "./components/NavBar.jsx";
import Hero from "./components/Hero.jsx";
import ProductViewer from "./components/ProductViewer.jsx";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

// Register GSAP plugins globally so they can be used
// across all components without re-registering
gsap.registerPlugin(ScrollTrigger);

const App = () => {
    return (
        <main>
            <NavBar />
            <Hero />
            <ProductViewer />
        </main>
    )
}

export default App;
