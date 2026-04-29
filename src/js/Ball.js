export default class Ball {
  constructor(ctx, cw, ch, sounds) {
    this.ctx = ctx;
    this.cw = cw;
    this.ch = ch;
    this.sounds = sounds;
    this.size = 20;
    this.x = 0;
    this.y = 0;
    this.prevY = 0;
    this.speedX = 0;
    this.speedY = 5;
    this.hitCount = 0;
  }

  reset(paddle, direction) {
    this.x = direction > 0
      ? paddle.x + paddle.width + 2
      : paddle.x - this.size - 2;
    this.y = paddle.y + paddle.height / 2 - this.size / 2;
    this.speedX = 9 * direction;
    this.speedY = 5;
  }

  speedUp() {
    if (this.speedX > 0 && this.speedX < 20) this.speedX += 0.25;
    else if (this.speedX < 0 && this.speedX > -20) this.speedX -= 0.25;

    if (this.speedY > 0 && this.speedY < 20) this.speedY += 0.5;
    else if (this.speedY < 0 && this.speedY > -20) this.speedY -= 0.5;
  }

  update() {
    this.prevY = this.y;
    this.x += this.speedX;
    this.y += this.speedY;

    if ((this.y <= 0 && this.speedY < 0) || (this.y + this.size >= this.ch && this.speedY > 0)) {
      this.speedY = -this.speedY;
      this.y = this.y < 0 ? 0 : this.ch - this.size;
      this.sounds.playBounceBorder();
      this.speedUp();
    }

    if (this.x <= 0 || this.x + this.size >= this.cw) {
      this.speedX = -this.speedX;
      this.speedUp();
    }
  }

  draw() {
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  // Strefy rakietki (rakietka 100px, relativeHit: 0.0=góra, 1.0=dół):
  // 0.00-0.15  strefa 3 skrajna (15px)  → ostry kąt, wymusza kierunek (góra/dół)
  // 0.15-0.35  strefa 2 boczna  (20px)  → średni kąt, min 4
  // 0.35-0.65  strefa 1 środek  (30px)  → płaski kąt, max 3.5
  // 0.65-0.85  strefa 2 boczna  (20px)  → średni kąt, min 4
  // 0.85-1.00  strefa 3 skrajna (15px)  → ostry kąt, wymusza kierunek (góra/dół)
  applyPaddleBounce(paddle, sounds) {
    const hitPos = (this.y + this.size / 2) - paddle.y;
    const relativeHit = Math.max(0, Math.min(1, hitPos / paddle.height));
    const yAbs = Math.abs(this.speedY);
    const yDir = this.speedY < 0 ? -1 : 1;

    if (relativeHit < 0.15 || relativeHit > 0.85) {
      const dir = relativeHit < 0.5 ? -1 : 1;
      this.speedY = Math.min(Math.max(yAbs * 1.8, 9), 17) * dir;
    } else if (relativeHit < 0.35 || relativeHit > 0.65) {
      this.speedY = Math.min(Math.max(yAbs * 1.2, 4), 11) * yDir;
    } else {
      this.speedY = Math.min(Math.max(yAbs * 0.2, 1.5), 3.5) * yDir;
    }

    this.speedX = -this.speedX;
    sounds.playBallHit();

    this.hitCount++;
    if (this.hitCount % 5 === 0) {
      if (Math.abs(this.speedX) < 22) this.speedX *= 1.1;
      if (Math.abs(this.speedY) < 17) this.speedY *= 1.1;
    }
  }
}
