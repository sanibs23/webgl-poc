import { Text } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import SoundManager from "./SoundManager";
import { useBox } from "@react-three/cannon";

function AnimalBox({ color, soundPath, initialPosition, label }) {
  const [dragging, setDragging] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(initialPosition);
  const [isPlaying, setPlaying] = useState(false); // Track if the sound is currently playing
  const soundManager = useRef(null);

  useEffect(() => {
    // Initialize soundManager when component mounts
    soundManager.current = new SoundManager(soundPath);
  }, [soundPath]);

  const [ref, api] = useBox(() => ({
    mass: 1,
    position: initialPosition,
    args: [0.38, 0.38, 0.38],
    onCollide: (e) => {
      // Check if collided with stage
      if (
        e.body.userData &&
        e.body.userData.name === "stage" &&
        soundManager.current
      ) {
        soundManager.current.play(); // Play sound on collision with stage
      }
    },
  }));

  useEffect(() => {
    const unsubscribe = api.position.subscribe((position) => {
      setCurrentPosition([...position]);
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, [api.position]);

  useEffect(() => {
    const roundedPosition = currentPosition.map((value) => Math.round(value));

    const isOnStage = checkIfOnStage(roundedPosition);
    if (isOnStage && !isPlaying) {
      setPlaying(true); // Mark sound as playing
    } else if (!isOnStage && isPlaying) {
      setPlaying(false); // Mark sound as stopped
    }
  }, [currentPosition]);

  useEffect(() => {
    if (!isPlaying && soundManager.current) {
      soundManager.current.stop(); // Stop sound when dragging
    }
  }, [isPlaying]);

  const checkIfOnStage = (position) => {
    // Assuming stage is centered at (0, 0) and has a radius of 1.5
    const stageCenter = [0, 0];
    const stageRadius = 1.5;

    // Calculate distance from the stage center to the current position
    const dx = position[0] - stageCenter[0];
    const dz = position[2] - stageCenter[1];
    const distance = Math.sqrt(dx ** 2 + dz ** 2);

    // Check if the position is within the stage radius
    return distance <= stageRadius;
  };

  const handlePointerDown = () => {
    setDragging(true);
    api.mass.set(0); // Temporarily disable physics during dragging
  };

  const handlePointerMove = (event) => {
    if (dragging) {
      setPlaying(false);
      // console.log([event.point.x, initialPosition[1], event.point.z]);
      api.position.set(event.point.x, initialPosition[1], event.point.z);
    }
  };

  const handlePointerUp = () => {
    setDragging(false);
    api.mass.set(1); // Re-enable physics after dragging
  };

  useEffect(() => {
    api.position.set(...initialPosition); // Reset position when initialPosition changes
    api.velocity.set(0, 0, 0); // Reset velocity to avoid it drifting
  }, [initialPosition, api]);

  return (
    <mesh
      ref={ref}
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
