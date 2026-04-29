import Paddle from "./Paddle.js";

export default class AI extends Paddle {
  constructor(ctx, x, color, cw, ch) {
    super(ctx, x, color);
    this.cw = cw;
    this.ch = ch;
  }

  update(ball) {
    const middlePaddle = this.y + this.height / 2;
    const middleBall = ball.y + ball.size / 2;

    if (ball.x > 500) {
      const diff = middlePaddle - middleBall;
      const abs = Math.abs(diff);
      if (abs > 8) {
        const step = Math.min(abs * 0.3, 20);
        this.y += diff > 0 ? -step : step;
      }
    } else if (ball.x <= 500 && ball.x > 150) {
      if (middlePaddle - middleBall > 100) this.y -= 3;
      else if (middlePaddle - middleBall < -100) this.y += 3;
    }

    if (this.y >= this.ch - this.height) this.y = this.ch - this.height;
    if (this.y <= 0) this.y = 0;
  }
}
