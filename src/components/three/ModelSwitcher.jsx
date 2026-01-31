import React, {useRef} from 'react'
import {PresentationControls} from "@react-three/drei";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

import MacbookModel16 from "../models/Macbook-16.jsx";
import MacbookModel14 from "../models/Macbook-14.jsx";

/**
 * Animation constants
 * Centralized for consistency and easy tuning
 */
const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

/**
 * Scale presets used to determine which model should be visible
 */
const SCALE_LARGE_DESKTOP = 0.08;
const SCALE_LARGE_MOBILE = 0.05;

/**
 * Fades all mesh materials inside a group to the given opacity.
 * Uses GSAP for smooth transitions.
 */
const fadeMeshes = (group, opacity) => {
    if (!group) return;

    group.traverse((child) => {
        if(child.isMesh) {
            child.material.transparent = true;
            gsap.to(child.material, { opacity, duration: ANIMATION_DURATION });
        }
    })
};

/**
 * Moves a group along the X axis with animation.
 * Used to slide models in and out of view.
 */
const moveGroup = (group, x) => {
    if (!group) return;

    gsap.to(group.position, { x, duration: ANIMATION_DURATION });
};

const ModelSwitcher = ({ scale, isMobile }) => {
    const smallMacbookRef = useRef(null);
    const largeMacbookRef = useRef(null);

    const showLargeMacbook = scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;

    /**
     * GSAP-driven animation logic that:
     * - Slides models horizontally
     * - Crossfades visibility between large and small MacBooks
     * Triggered whenever `scale` changes
     */
    useGSAP(() => {
        if (showLargeMacbook) {
            // Hide small model and bring large model into focus
            moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
            moveGroup(largeMacbookRef.current, 0);

            fadeMeshes(smallMacbookRef.current, 0);
            fadeMeshes(largeMacbookRef.current, 1);
        } else {
            // Hide large model and bring small model into focus
            moveGroup(smallMacbookRef.current, 0);
            moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);

            fadeMeshes(smallMacbookRef.current, 1);
            fadeMeshes(largeMacbookRef.current, 0);
        }
    }, [scale]);


    /**
     * Shared interaction configuration for PresentationControls.
     * Ensures consistent rotation, snapping, and motion feel
     * across both models.
     */
    const controlsConfig = {
        // When true, the model smoothly snaps back to its initial
        // rotation once the user stops interacting with it
        snap: true,

        // Controls how fast the model responds to user drag interactions
        // Higher value = faster rotation response
        speed: 1,

        // Controls zoom sensitivity (pinch / scroll)
        // 1 = default zoom speed
        zoom: 1,

        // Vertical rotation limits (up / down)
        // Values are in radians
        // [-Math.PI, Math.PI] allows full vertical rotation
        polar: [-Math.PI, Math.PI],

        // Horizontal rotation limits (left / right)
        // [-Infinity, Infinity] allows unlimited horizontal rotation
        azimuth: [-Infinity, Infinity],

        // Spring physics configuration for smooth motion
        // mass: weight of the object (higher = heavier feel)
        // tension: stiffness of the spring (lower = looser motion)
        // friction: resistance / damping (higher = slower settling)
        config: {
            mass: 1,
            tension: 0,
            friction: 26,
        },
    };

    return (
        <>
            {/* Large MacBook model */}
            <PresentationControls {...controlsConfig}>
                <group ref={largeMacbookRef}>
                    <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
                </group>
            </PresentationControls>

            {/* Small MacBook model */}
            <PresentationControls {...controlsConfig}>
                <group ref={smallMacbookRef}>
                    <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
                </group>
            </PresentationControls>
        </>
    )
};

export default ModelSwitcher;
