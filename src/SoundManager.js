class SoundManager {
  static instances = [];

  constructor(soundPath) {
    this.soundPath = soundPath;
    this.audio = new Audio(soundPath);
    SoundManager.instances.push(this); // Track each instance
  }

  play() {
    this.audio.loop = true;
    this.audio.play();
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0; // Reset audio to start
  }

  static stopAll() {
    SoundManager.instances.forEach((instance) => instance.stop());
  }
}

export default SoundManager;
