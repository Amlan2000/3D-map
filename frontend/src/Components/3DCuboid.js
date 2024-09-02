import React, { useEffect, useRef } from 'react';
import * as BABYLON from '@babylonjs/core';

const BabylonScene = ({ textureUrl }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = new BABYLON.Engine(canvas, true);

    const createScene = () => {
      const scene = new BABYLON.Scene(engine);

      // Create a camera looking at the origin
      const camera = new BABYLON.ArcRotateCamera(
        "camera1",
        Math.PI / 2,
        Math.PI / 4,
        4,
        BABYLON.Vector3.Zero(),
        scene
      );
      camera.attachControl(canvas, true);

      // Add a light to the scene
      const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
      light.intensity = 1.7; // Adjust intensity if needed

      // Create a 3D cuboid (box)
      const box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene);

      // Apply the captured map image as a texture if available
      if (textureUrl) {
        const material = new BABYLON.StandardMaterial("boxMat", scene);
        material.diffuseTexture = new BABYLON.Texture(textureUrl, scene);
        box.material = material;
      }

      return scene;
    };

    const scene = createScene();

    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener("resize", () => {
      engine.resize();
    });

    return () => {
      engine.dispose();
    };
  }, [textureUrl]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "400px" }} />;
};

export default BabylonScene;
