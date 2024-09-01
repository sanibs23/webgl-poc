class SoundManager {
  static instances = {};

  constructor(soundPath) {
    this.soundPath = soundPath;

    if (!SoundManager.instances[soundPath]) {
      this.audio = new Audio(soundPath);
      SoundManager.instances[soundPath] = this.audio;
    } else {
      this.audio = SoundManager.instances[soundPath];
    }
  }

  play() {
    console.log("playing audio");
    this.audio.loop = true;
    this.audio.play();
  }

  stop() {
    console.log("stopping audio");
    this.audio.pause();
    this.audio.currentTime = 0; // Reset audio to start
  }

  static stopAll() {
    Object.values(SoundManager.instances).forEach((audio) => audio.pause());
  }
}

export default SoundManager;
