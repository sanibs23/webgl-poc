/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useState } from "react";

import { Text } from "@react-three/drei";
import SoundManager from "./SoundManager";

function AnimalBox({ color, soundPath, initialPosition, label, onDrop }) {
  const [position, setPosition] = useState(initialPosition);
  const [dragging, setDragging] = useState(false);
  const soundManager = new SoundManager(soundPath);

  const handlePointerDown = () => {
    setDragging(true);
  };

  const handlePointerMove = (event) => {
    if (dragging) {
      setPosition([event.point.x, position[1], event.point.z]);
    }
  };

  const handlePointerUp = () => {
    setDragging(false);

    onDrop(position, () => soundManager.play());
  };

  return (
    <mesh
      position={position}
      castShadow
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <boxGeometry args={[0.38, 0.38, 0.38]} />
      <meshStandardMaterial color={color} />
      <Text
        position={[0, 0.6, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </mesh>
  );
}

export default AnimalBox;
