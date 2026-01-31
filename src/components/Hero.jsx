import React, {useEffect, useRef} from 'react'

const Hero = () => {
    const videoRef = useRef(null);

    /**
     * Increase playback speed to make the hero animation
     * feel more dynamic and cinematic on load
     */
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 2;
        }
    }, []);

    return (
        <section id="hero">
            <div>
                <h1>Macbook Pro</h1>
                <img src="/title.png" alt="Macbook Title" />
            </div>

            {/* Autoplay background video for immersive hero experience */}
            <video ref={videoRef} src="/videos/hero.mp4" preload="auto" autoPlay muted playsInline />

            <button>Buy</button>

            <p>From $1599 or $133/mo for 12 months</p>
        </section>
    )
};

export default Hero;
