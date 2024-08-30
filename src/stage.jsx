/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
// import React from 'react';

function Stage({ position = [0, 0, 0] }) {
  return (
    <mesh position={position} receiveShadow>
      <cylinderGeometry args={[1.5, 1.5, 0.1, 64]} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
}

export default Stage;
