/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import Stage from "./stage";
import AnimalBox from "./AnimalBox";

function CanvasContainer({ positions }) {
  const handleDrop = (position, playSound, stopSound, setInitPos) => {
    const isWithinStage = Math.sqrt(position[0] ** 2 + position[2] ** 2) <= 1.5;

    if (isWithinStage) {
      console.log("Dropped on stage at position:", position);
      playSound();
    } else {
      // need to set the position back to the initial position
      setInitPos();
      stopSound();
      console.log("Dropped outside of stage");
    }
  };

  return (
    <Canvas
      shadows
      camera={{ position: [9, 5, 5], fov: 50 }}
      onCreated={(state) => state.camera.lookAt(0, 0, 0)}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} castShadow />

      <Stage />

      <AnimalBox
        color="brown"
        soundPath="/asset/dog.wav"
        initialPosition={positions.dog}
        label="Dog"
        onDrop={handleDrop}
      />
      <AnimalBox
        color="green"
        soundPath="/asset/cow.wav"
        initialPosition={positions.cow}
        label="Cow"
        onDrop={handleDrop}
      />

      <AnimalBox
        color="yellow"
        soundPath="/asset/cat.wav"
        initialPosition={positions.cat}
        label="Cat"
        onDrop={handleDrop}
      />
    </Canvas>
  );
}

export default CanvasContainer;
