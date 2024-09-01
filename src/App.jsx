import { useState } from "react";
import CanvasContainer from "./CanvasContainer";
import SoundManager from "./SoundManager";

function App() {
  const initialPositions = {
    dog: [1.31868, 0.7, 1.7560704],
    cow: [1.611694016323642, 0.68, 0.9120070399963702],
    cat: [1.7178714999425522, 0.68, 0.08383195852578564],
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
      <CanvasContainer
        positions={animalPositions}
        setPositions={setAnimalPositions}
      />
    </div>
  );
}

export default App;
