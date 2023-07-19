import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, GizmoHelper,GizmoViewport,Grid  } from "@react-three/drei";
import * as THREE from "three";

// We change the default orientation - threejs tends to use Y are the height,
// while replicad uses Z. This is mostly a representation default.
THREE.Object3D.DefaultUp.set(0, 0, 1);

// This is the basics to render a nice looking model user react-three-fiber
//
// The camera is positioned for the model we present (that cannot change size.
// You might need to adjust this with something like the autoadjust from the
// `Stage` component of `drei`
//
// Depending on your needs I would advice not using a light and relying on
// a matcap material instead of the meshStandardMaterial used here.
export default function ThreeContext({ children, ...props }) {
  const dpr = Math.min(window.devicePixelRatio, 2);
  const GridMaterialType = {
    cellSize: 100,
    cellThickness: 1.5,
    cellColor: new THREE.Color("black"),
    sectionSize: 10,
    sectionThickness: 1,
    sectionColor: new THREE.Color("pink"),
    followCamera: false,
    infiniteGrid: true,
    fadeDistance: 10000,
    fadeStrength: .1,
  };

  const GridProps = {
    args: [1000, 10,1000,10], // Customize the grid size as per your needs
    ...GridMaterialType,
  };
  return (
    <Suspense fallback={null}>
      <Canvas
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#f5f5f5",
        }}
        dpr={dpr}
        frameloop="demand"
        camera={{ position: [130, 30, 700] }}
        {...props}
      >
         
         <Grid rotation={[ Math.PI /2,0,0]} {...GridProps} />
        <OrbitControls />
        <ambientLight />
        <GizmoHelper
          alignment="bottom-right" // widget alignment within scene
          margin={[80, 80]} // widget margins (X, Y)
        >
          <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
          {/* alternative: <GizmoViewcube /> */}
        </GizmoHelper>
        <pointLight position={[100, 100, 100]} />
        {children}
      </Canvas>
    </Suspense>
  );
}
