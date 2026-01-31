import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import {
    performanceImages,
    performanceImgPositions,
} from "../constants/index.js";
import { useMediaQuery } from "react-responsive";

const Performance = () => {
    // Heavy scroll-based image animations are disabled on smaller screens
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    // Reference to the performance section
    // Used as the scope and trigger for GSAP animations
    const sectionRef = useRef(null);

    /**
     * GSAP animations for the Performance section
     * This hook runs when the section enters the viewport
     * and re-runs when screen size changes (mobile vs desktop)
     */
    useGSAP(
        () => {
            const sectionEl = sectionRef.current;
            if (!sectionEl) return;

            /**
             * TEXT ANIMATION
             * Fades and slides in the descriptive paragraph as it scrolls into view
             * Provides a subtle narrative entrance without overpowering visuals
             */
            gsap.fromTo(
                ".content p",
                {
                    opacity: 0,
                    y: 10,
                },
                {
                    opacity: 1,
                    y: 0,
                    ease: "power1.out",
                    scrollTrigger: {
                        // Trigger animation when paragraph enters viewport
                        trigger: ".content p",
                        start: "top bottom",
                        end: "top center",
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                }
            );

            // Skip image animations entirely on mobile for performance and usability
            if (isMobile) return;

            /**
             * IMAGE POSITIONING TIMELINE (DESKTOP ONLY)
             * Animates multiple performance images into their final layout positions
             * as the user scrolls through the section
             */
            const timeline = gsap.timeline({
                defaults: {
                    duration: 2,
                    ease: "power1.inOut",
                    overwrite: "auto",
                },
                scrollTrigger: {
                    // Scroll range that drives the image transitions
                    trigger: sectionEl,
                    start: "top bottom",
                    end: "center center",
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });

            /**
             * POSITION EACH PERFORMANCE IMAGE
             * Iterates through predefined layout data and animates
             * images to their respective positions
             */
            performanceImgPositions.forEach((item) => {
                // Skip the base / anchor image
                if (item.id === "p5") return;

                const selector = `.${item.id}`;
                const vars = {};

                // Apply positional values only if defined
                if (typeof item.left === "number") vars.left = `${item.left}%`;
                if (typeof item.right === "number") vars.right = `${item.right}%`;
                if (typeof item.bottom === "number") vars.bottom = `${item.bottom}%`;

                // Apply optional transform (scale, rotate, translate, etc.)
                if (item.transform) vars.transform = item.transform;

                // Animate all images in parallel at the same timeline position
                timeline.to(selector, vars, 0);
            });
        },
        {
            // Limit GSAP selector scope to this section only
            scope: sectionRef,

            // Re-run animations when responsive state changes
            dependencies: [isMobile],
        }
    );

    return (
        <section id="performance" ref={sectionRef}>
            <h2>Next-level graphics performance. Game on.</h2>

            {/* Image container for animated performance visuals */}
            <div className="wrapper">
                {performanceImages.map((item, index) => (
                    <img
                        key={index}
                        src={item.src}
                        className={item.id}
                        alt={item.alt || `Performance Image #${index + 1}`}
                    />
                ))}
            </div>

            {/* Text content revealed during scroll */}
            <div className="content">
                <p>
                    Run graphics-intensive workflows with a responsiveness that keeps up
                    with your imagination. The M4 family of chips features a GPU with a
                    second-generation hardware-accelerated ray tracing engine that renders
                    images faster, so{" "}
                    <span className="text-white">
                        gaming feels more immersive and realistic than ever.
                    </span><br />
                    And Dynamic Caching optimizes fast on-chip memory to dramatically
                    increase average GPU utilization — driving a huge performance boost
                    for the most demanding pro apps and games.
                </p>
            </div>
        </section>
    );
};

export default Performance;
