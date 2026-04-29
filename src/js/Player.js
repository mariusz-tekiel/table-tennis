import Paddle from "./Paddle.js";

export default class Player extends Paddle {
  constructor(ctx, x, color, canvas) {
    super(ctx, x, color);
    this.canvas = canvas;
    this.canvas.addEventListener("mousemove", (e) => this.updatePosition(e));
  }

  updatePosition(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scale = this.ctx.canvas.height / rect.height;
    this.y = (e.clientY - rect.top) * scale - this.height / 2;
    if (this.y < 0) this.y = 0;
    if (this.y > this.ctx.canvas.height - this.height) {
      this.y = this.ctx.canvas.height - this.height;
    }
  }
}
