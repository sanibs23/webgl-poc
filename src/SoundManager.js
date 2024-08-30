// import { useEffect, useRef } from "react";

class SoundManager {
  constructor(soundPath) {
    this.soundPath = soundPath;
    this.audio = new Audio(soundPath);
  }

  play() {
    this.audio.play();
  }
}

export default SoundManager;
