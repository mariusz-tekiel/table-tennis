export default class SoundManager {
  constructor() {
    this.ballHit = new Audio("assets/sounds/ball_hit.wav");
    this.point = new Audio("assets/sounds/point.wav");
    this.bounceBorder = new Audio("assets/sounds/bounceBorder.flac");
    this.bounceBorder.volume = 0.2;
  }

  playBallHit() { this.ballHit.currentTime = 0; this.ballHit.play().catch(() => {}); }
  playPoint() { this.point.currentTime = 0; this.point.play().catch(() => {}); }
  playBounceBorder() { this.bounceBorder.currentTime = 0; this.bounceBorder.play().catch(() => {}); }
}
