/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { Canvas } from "@react-three/fiber";
import { Physics, usePlane } from "@react-three/cannon";
import Stage from "./Stage";
import AnimalBox from "./AnimalBox";
import { OrbitControls } from "@react-three/drei";
// import GroundPlane from "./GroundPlane";

function GroundPlane() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [-3.5, -1.8, -1], // Adjusted position to be centered below the stage
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[12, 12]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}

function CanvasContainer({ positions }) {
  const handleDrop = (position, playSound, stopSound, setInitPos) => {
    const stageCenter = [0, 0]; // Stage is centered at (0, 0)
    const stageRadius = 1.5;

    const dx = position[0] - stageCenter[0];
    const dz = position[2] - stageCenter[1];
    const distance = Math.sqrt(dx ** 2 + dz ** 2);

    const isWithinStage = distance <= stageRadius;

    if (isWithinStage) {
      playSound();
    } else {
      stopSound();
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
      {/* <OrbitControls /> */}
      <Physics gravity={[0, -7.8, 0]}>
        {/* Gravity set to 80% of Earth's gravity */}
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
