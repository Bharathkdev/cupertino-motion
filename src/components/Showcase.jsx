import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Showcase = () => {
    // Scroll-based pinning animations are disabled on these devices
    const isTablet = useMediaQuery({ query: '(max-width: 600px)' });

    /**
     * Scroll-driven GSAP animation for desktop devices:
     * - Pins the showcase section while scrolling
     * - Scales the masked logo image slightly for depth
     * - Reveals content with a fade-in and upward motion
     */
    useGSAP(() => {
        if (!isTablet) {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    // Section that drives the scroll animation
                    trigger: '#showcase',

                    // Pin section from top of viewport
                    start: 'top top',
                    end: 'bottom top',

                    // Smoothly sync animation with scroll position
                    scrub: true,

                    // Lock the section in place during animation
                    pin: true,
                },
            });

            timeline
                // Subtle scale-up for visual emphasis
                .to('.mask img', {
                    transform: 'scale(1.1)',
                })
                // Reveal textual content as the user scrolls
                .to('.content', {
                    opacity: 1,
                    y: 0,
                    ease: 'power1.in',
                });
        }
    }, [isTablet]);

    return (
        <section id="showcase">
            {/* Media container with background video and masked overlay */}
            <div className="media">
                <video
                    src="/videos/game.mp4"
                    loop
                    muted
                    autoPlay
                    playsInline
                />

                {/* Masked logo overlay used in scroll animation */}
                <div className="mask">
                    <img src="/mask-logo.svg" alt="Mask Logo" />
                </div>
            </div>

            {/* Content revealed during scroll animation */}
            <div className="content">
                <div className="wrapper">
                    {/* Left column: descriptive content */}
                    <div className="lg:max-w-md">
                        <h2>Rocket Chip</h2>

                        <div className="space-y-5 mt-7 pe-10">
                            <p>
                                Introducing{' '}
                                <span className="text-white">
                                    M4, the next generation of Apple Silicon.
                                </span>
                            </p>
                            <p>
                                It drives Apple Intelligence on iPad Pro, so you
                                can write, create, and accomplish more with ease.
                                All in a design that's unbelievably thin, light,
                                and powerful.
                            </p>
                            <p>
                                A brand-new display engine delivers breathtaking
                                precision, color accuracy, and brightness. And a
                                next-gen GPU with hardware-accelerated ray tracing
                                brings console-level graphics to your fingertips.
                            </p>
                            <p className="text-primary">
                                Learn more about Apple Intelligence
                            </p>
                        </div>
                    </div>

                    {/* Right column: performance highlights */}
                    <div className="max-w-3xs space-y-14">
                        <div className="space-y-2">
                            <p>Up to</p>
                            <h3>4x faster</h3>
                            <p>pro rendering performance than M3</p>
                        </div>
                        <div className="space-y-2">
                            <p>Up to</p>
                            <h3>1.5x faster</h3>
                            <p>CPU performance than M3</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Showcase;