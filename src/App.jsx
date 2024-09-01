// import React from "react";
import { useState } from "react";
import CanvasContainer from "./CanvasContainer";
import SoundManager from "./SoundManager";

function App() {
  const initialPositions = {
    dog: [5.31868036280535, 0.7, 1.7560704085677732],
    cow: [4.442241956641566, 0.68, 3.457655428003738],
    cat: [4.877665716528814, 0.7, 2.5112758863190425],
  };

  const [animalPositions, setAnimalPositions] = useState({
    ...initialPositions,
  });
  const reset = () => {
    SoundManager.stopAll();
    setAnimalPositions({ ...initialPositions });
  };
  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      <div style={{ padding: "10px" }}>
        <button onClick={() => reset()}>Reset</button>
      </div>
      <CanvasContainer positions={animalPositions} />
    </div>
  );
}

export default App;
