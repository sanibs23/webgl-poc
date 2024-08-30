/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Stage from "./Stage";
import AnimalBox from "./AnimalBox";

function CanvasContainer() {
  const handleDrop = (position) => {
    // Assuming the stage is centered at [0, 0, 0] and has a radius of 1.5
    const isWithinStage = Math.sqrt(position[0] ** 2 + position[2] ** 2) <= 1.5;

    if (isWithinStage) {
      console.log("Dropped on stage at position:", position);
      // Additional logic for when the animal is dropped on the stage
    } else {
      console.log("Dropped outside of stage");
    }
  };

  return (
    <Canvas shadows>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} castShadow />
      <OrbitControls enablePan={false} enableZoom={false} />

      <Stage />

      <AnimalBox
        color="brown"
        soundPath="/asset/dog.wav"
        initialPosition={[2, 0.5, 0]}
        label="Dog"
        onDrop={handleDrop}
      />
      <AnimalBox
        color="black"
        soundPath="/asset/cow.wav"
        initialPosition={[2, 0.5, 1]}
        label="Cow"
        onDrop={handleDrop}
      />
    </Canvas>
  );
}

export default CanvasContainer;
