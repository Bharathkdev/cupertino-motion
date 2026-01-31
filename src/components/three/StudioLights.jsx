import React from 'react'
import {Environment, Lightformer} from "@react-three/drei";

const StudioLights = () => {
    return (
        <group name="lights">
            {/*
                Environment lighting used to create soft, realistic reflections
                and global illumination using lightformers
            */}
            <Environment resolution={256}>
                <group>
                    {/* Left rectangular light source to create side highlights */}
                    <Lightformer
                        form="rect"
                        intensity={10}
                        position={[-10, 5, -5]}
                        scale={10}
                        rotation-y={Math.PI / 2}
                    />

                    {/* Right rectangular light source to balance reflections */}
                    <Lightformer
                        form="rect"
                        intensity={10}
                        position={[10, 0, 1]}
                        scale={10}
                        rotation-y={Math.PI / 2}
                    />
                </group>
            </Environment>

            {/* Top-front spotlight to add focused highlights and depth */}
            <spotLight
                position={[-2, 10, 5]}
                angle={0.15}
                decay={0}
                intensity={Math.PI * 0.2}
            />

            {/* Bottom spotlight to subtly lift shadows from below */}
            <spotLight
                position={[0, -25, 10]}
                angle={0.15}
                decay={0}
                intensity={Math.PI * 0.2}
            />

            {/* Main key light to define form and enhance product visibility */}
            <spotLight
                position={[0, 15, 5]}
                angle={0.15}
                decay={0.1}
                intensity={Math.PI}
            />
        </group>
    )
};

export default StudioLights;
