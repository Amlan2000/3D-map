import React, { useEffect, useRef } from 'react';
import * as BABYLON from '@babylonjs/core';

const BabylonScene = ({ textureUrl }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = new BABYLON.Engine(canvas, true);

    const createScene = () => {
      const scene = new BABYLON.Scene(engine);

      const camera = new BABYLON.ArcRotateCamera(
        "camera1",
        Math.PI / 2,
        Math.PI / 4,
        4,
        BABYLON.Vector3.Zero(),
        scene
      );
      camera.attachControl(canvas, true);

      const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
      light.intensity = 2.0; // Adjust intensity if needed

      const box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene);
      
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

  console.log("texture: "+ textureUrl);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default BabylonScene;
