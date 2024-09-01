/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { Physics, usePlane } from "@react-three/cannon";
import Stage from "./Stage";
import AnimalBox from "./AnimalBox";

function GroundPlane() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [-2, -1, 0], // Adjust position to be below the stage
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}

function CanvasContainer({ positions }) {
  const handleDrop = (position, playSound, stopSound) => {
    // Assuming stage is centered at (0, 0) and has a radius of 1.5
    const stageCenter = [0, 0];
    const stageRadius = 1.5;

    // Calculate distance from the stage center to the dropped position
    const dx = position[0] - stageCenter[0];
    const dz = position[2] - stageCenter[1];
    const distance = Math.sqrt(dx ** 2 + dz ** 2);

    // Check if the drop is within the stage radius
    const isWithinStage = distance <= stageRadius;

    console.log(`Drop Position:`);
    console.dir(position);
    console.log(`Distance from Stage Center: ${distance}`);
    console.log(`Is Within Stage: ${isWithinStage}`);

    if (isWithinStage) {
      console.dir("Dropped on stage at position:", position);
      playSound();
    } else {
      // setInitPos();
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

      <Physics>
        <GroundPlane />
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
      </Physics>
    </Canvas>
  );
}

export default CanvasContainer;
