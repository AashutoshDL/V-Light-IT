// components/Model.js
import React from "react";
import { useGLTF } from "@react-three/drei";

// Preload to make it instant
useGLTF.preload("/models/hard_drive.glb");

export default function Model(props) {
  const { scene } = useGLTF("/models/hard_drive.glb");
  return <primitive object={scene} {...props} />;
}
