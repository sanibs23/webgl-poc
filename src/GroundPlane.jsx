import { usePlane } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";

function GroundPlane() {
  const { size } = useThree(); // Get the size of the canvas
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [-9, -1, -6], // Adjust position as needed
  }));

  // Calculate the size of the ground plane to cover 60% of the canvas
  const [planeSize, setPlaneSize] = useState([25, 25]);

  //   useEffect(() => {
  //     // Set the plane size based on the canvas size
  //     setPlaneSize([size.width * 0.6, size.height * 0.6]);
  //   }, [size]);

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={planeSize} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}

export default GroundPlane;
