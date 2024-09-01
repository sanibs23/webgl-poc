/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useCylinder } from "@react-three/cannon";

function Stage({ position = [0, 0, 0] }) {
  const [ref] = useCylinder(() => ({
    mass: 0,
    position,
    args: [1.5, 1.5, 0.5, 64],
    userData: { name: "stage" },
    onCollide: () => {
      console.log("The animal has hit the stage!");
    },
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <cylinderGeometry args={[1.5, 1.5, 0.5, 64]} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
}
export default Stage;
