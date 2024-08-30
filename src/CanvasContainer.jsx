/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import Stage from "./stage";
import AnimalBox from "./AnimalBox";

function CanvasContainer() {
  const handleDrop = (position, playSound, setInitPos) => {
    const isWithinStage = Math.sqrt(position[0] ** 2 + position[2] ** 2) <= 1.5;

    if (isWithinStage) {
      console.log("Dropped on stage at position:", position);
      playSound();
    } else {
      // need to set the position back to the initial position
      setInitPos();
      console.log("Dropped outside of stage");
    }
  };

  return (
    <Canvas
      shadows
      camera={{ position: [5, 5, 5], fov: 50 }}
      onCreated={(state) => state.camera.lookAt(0, 0, 0)}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} castShadow />

      <Stage />

      <AnimalBox
        color="brown"
        soundPath="/asset/dog.wav"
        initialPosition={[2.9060438084608067, 1, 3.0090094185268157]}
        label="Dog"
        onDrop={handleDrop}
      />
      <AnimalBox
        color="green"
        soundPath="/asset/cow.wav"
        initialPosition={[3.3870179497668502, 1, 2.382343455587395]}
        label="Cow"
        onDrop={handleDrop}
      />
    </Canvas>
  );
}

export default CanvasContainer;
