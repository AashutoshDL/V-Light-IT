"use client";

import dynamic from "next/dynamic";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

const Model = dynamic(() => import("../components/Model"), { ssr: false });

export default function Home() {
  return (
    <main className={`flex flex-row md:flex-row bg-background`}>
      <div className="w-full md:w-1/2 min-h-screen flex flex-col px-4">
        <div className="ml-30 mt-50">
          <p className="text-4xl font-light">YOUR PIT STOP FOR</p>
        </div>
        <div className="ml-30 mt-5">
          <h1 className="text-5xl md:text-8xl font-bold mt-4">
            COMPUTER <br /> HARDWARE
          </h1>
        </div>
        <div className="mt-70 text-end bg-button-background">
          <button className="px-6 py-3 text-lg rounded transition">
            Explore more products
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/2 min-h-screen">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[2, 0, 2]} />
          <Suspense
            fallback={<div className="text-black">Loading model...</div>}
          >
            <Model
              scale={20}
              position={[-0.5, -1, 0]}
              rotation={[Math.PI / 2, -0.2, 0]}
            />
            <OrbitControls
              enableZoom={true}
              minPolarAngle={Math.PI / 2} // 45° — look down limit
              maxPolarAngle={Math.PI / 2} // 90° — look up limit
              minDistance={5} // min zoom distance
              maxDistance={5}
            />
          </Suspense>
        </Canvas>
      </div>
    </main>
  );
}
