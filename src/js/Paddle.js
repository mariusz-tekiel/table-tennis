export default class Paddle {
  constructor(ctx, x, color) {
    this.ctx = ctx;
    this.x = x;
    this.y = 200;
    this.width = 20;
    this.height = 100;
    this.color = color;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
