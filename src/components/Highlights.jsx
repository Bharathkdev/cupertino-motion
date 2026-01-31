import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Highlights = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

    /**
     * Scroll-based entrance animation for highlight columns.
     * Animates both left and right masonry columns into view
     * with a staggered fade and upward motion.
     */
    useGSAP(() => {
        gsap.to(['.left-column', '.right-column'], {
            scrollTrigger: {
                // Section that triggers the animation
                trigger: '#highlights',

                // Start animation later on mobile to avoid abrupt entry
                start: isMobile ? 'bottom bottom' : 'top top',
            },

            // Final visible state
            y: 0,
            opacity: 1,

            // Stagger columns for a smoother reveal
            stagger: 0.5,

            // Animation timing and easing
            duration: 1,
            ease: 'power1.inOut',
        });
    }, []);

    return (
        <section id="highlights">
            <h2>There's never been a better time to upgrade.</h2>
            <h3>Here's what you get with the new MacBook Pro.</h3>

            {/*
                Masonry-style layout for feature highlights.
                Content is split into left and right columns
                to create a balanced, editorial-style layout.
            */}
            <div className="masonry">
                <div className="left-column">
                    <div>
                        <img src="/laptop.png" alt="Laptop" />
                        <p>Fly through demanding tasks up to 9.8x faster.</p>
                    </div>
                    <div>
                        <img src="/sun.png" alt="Sun" />
                        <p>
                            A stunning <br />
                            Liquid Retina XDR <br />
                            display.
                        </p>
                    </div>
                </div>

                <div className="right-column">
                    <div className="apple-gradient">
                        <img src="/ai.png" alt="AI" />
                        <p>
                            Built for <br />
                            <span>Apple Intelligence.</span>
                        </p>
                    </div>
                    <div>
                        <img src="/battery.png" alt="Battery" />
                        <p>
                            Up to
                            <span className="green-gradient">
                                {' '}14 more hours{' '}
                            </span>
                            battery life.
                            <span className="text-dark-100">
                                {' '}(Up to 24 hours total.)
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Highlights;
