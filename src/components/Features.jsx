import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import clsx from "clsx";
import { Html } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import StudioLights from "./three/StudioLights.jsx";
import { features, featureSequence } from "../constants/index.js";
import MacbookModel from "./models/Macbook.jsx";
import useMacbookStore from "../store/index.js";

/**
 * ModelScroll
 * ------------
 * Handles all scroll-driven behavior related to the 3D MacBook model:
 * - Preloads feature videos for smooth texture switching
 * - Rotates the 3D model during scroll
 * - Synchronizes feature text visibility with screen texture changes
 */
const ModelScroll = () => {
    // Reference to the 3D model group for rotation animations
    const groupRef = useRef(null);

    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    const { setTexture } = useMacbookStore();

    /**
     * PRELOAD FEATURE VIDEOS
     * ----------------------
     * Preloads all feature videos on mount to avoid
     * flickering or loading delays during scroll-triggered texture swaps
     */
    useEffect(() => {
        featureSequence.forEach((feature) => {
            const video = document.createElement("video");

            Object.assign(video, {
                src: feature.videoPath,
                muted: true,
                playsInline: true,
                preload: "auto",
                crossOrigin: "anonymous",
            });

            video.load();
        });
    }, []);

    /**
     * GSAP SCROLL ANIMATIONS
     * ----------------------
     * Creates two independent scroll timelines:
     * 1. A pinned timeline that rotates the 3D model
     * 2. A synced timeline that updates screen textures
     *    and reveals feature content as the user scrolls
     */
    useGSAP(() => {
        /**
         * MODEL ROTATION TIMELINE
         * -----------------------
         * Pins the canvas and rotates the MacBook 360°
         * as the user scrolls through the features section
         */
        const modelTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#f-canvas",
                start: "top top",
                end: "bottom top",
                scrub: 1,
                pin: true,
            },
        });

        /**
         * FEATURE CONTENT & TEXTURE SYNC TIMELINE
         * --------------------------------------
         * Synchronizes:
         * - Screen video texture changes
         * - Feature text fade-in animations
         * This keeps visuals and copy perfectly aligned
         */
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#f-canvas",
                start: "top center",
                end: "bottom top",
                scrub: 1,
            },
        });

        // Apply continuous Y-axis rotation to the 3D model
        if (groupRef.current) {
            modelTimeline.to(groupRef.current.rotation, {
                y: Math.PI * 2,
                ease: "power1.inOut",
            });
        }

        /**
         * FEATURE SEQUENCE
         * ----------------
         * Each step:
         * - Updates the MacBook screen video
         * - Reveals the corresponding feature box
         */
        timeline
            .call(() => setTexture("/videos/feature-1.mp4"))
            .to(".box1", { opacity: 1, y: 0, delay: 1 })

            .call(() => setTexture("/videos/feature-2.mp4"))
            .to(".box2", { opacity: 1, y: 0 })

            .call(() => setTexture("/videos/feature-3.mp4"))
            .to(".box3", { opacity: 1, y: 0 })

            .call(() => setTexture("/videos/feature-4.mp4"))
            .to(".box4", { opacity: 1, y: 0 })

            .call(() => setTexture("/videos/feature-5.mp4"))
            .to(".box5", { opacity: 1, y: 0 });
    }, []);

    /**
     * Renders the 3D MacBook model inside the canvas
     * Suspense ensures graceful loading while the model is fetched
     */
    return (
        <group ref={groupRef}>
            <Suspense
                fallback={
                    <Html>
                        <h1 className="text-white text-3xl uppercase">
                            Loading...
                        </h1>
                    </Html>
                }
            >
                <MacbookModel
                    scale={isMobile ? 0.05 : 0.08}
                    position={[0, -1, 0]}
                />
            </Suspense>
        </group>
    );
};

const Features = () => {
    return (
        <section id="features">
            {/* Section heading */}
            <h2>See it all in a new light.</h2>

            {/*
                3D CANVAS
                ----------
                Hosts the MacBook model, lighting, and scroll-driven animations
            */}
            <Canvas id="f-canvas" camera={{}}>
                <StudioLights />
                <ambientLight intensity={0.5} />
                <ModelScroll />
            </Canvas>

            {/*
                FEATURE OVERLAY CONTENT
                -----------------------
                Feature descriptions positioned above the canvas.
                Each box is animated into view during scroll.
            */}
            <div className="absolute inset-0">
                {features.map((feature, index) => (
                    <div
                        key={feature.id}
                        className={clsx(
                            "box",
                            `box${index + 1}`,
                            feature.styles
                        )}
                    >
                        <img
                            src={feature.icon}
                            alt={feature.highlight}
                        />
                        <p>
                            <span className="text-white">
                                {feature.highlight}{" "}
                            </span>
                            {feature.text}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
