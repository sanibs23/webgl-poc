/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */

function Stage({ position = [0, 0, 0] }) {
  return (
    <mesh position={position} receiveShadow>
      {/* Increase the height (depth) by changing the third argument */}
      <cylinderGeometry args={[1.5, 1.5, 0.5, 64]} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
}

export default Stage;
