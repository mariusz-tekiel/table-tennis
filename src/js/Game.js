import SoundManager from "./SoundManager.js";
import Table from "./Table.js";
import Ball from "./Ball.js";
import Player from "./Player.js";
import AI from "./AI.js";

export default class Game {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 1000;
    this.canvas.height = 500;
    this.cw = this.canvas.width;
    this.ch = this.canvas.height;

    this.sounds = new SoundManager();
    this.table = new Table(this.ctx, this.cw, this.ch);
    this.ball = new Ball(this.ctx, this.cw, this.ch, this.sounds);
    this.player = new Player(this.ctx, 70, "#d8320b", this.canvas);
    this.ai = new AI(this.ctx, 910, "#3385e3", this.cw, this.ch);

    this.scoreP = 0;
    this.scoreAi = 0;
    this.pause = true;
    this.gameOver = false;
    this.server = "player";
    this.serveTimeoutId = null;

    this.canvas.addEventListener("click", () => {
      if (!this.gameOver && this.server === "player") this.pause = false;
    });

    const animate = () => {
      this.loop();
      if (!this.gameOver) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  checkPaddleCollision() {
    const b = this.ball;
    const p = this.player;
    const a = this.ai;

    const yMin = Math.min(b.prevY, b.y);
    const yMax = Math.max(b.prevY + b.size, b.y + b.size);

    if (b.speedX < 0 &&
        b.x <= p.x + p.width &&
        yMax > p.y &&
        yMin < p.y + p.height) {
      b.applyPaddleBounce(p, this.sounds);
    }

    if (b.speedX > 0 &&
        b.x + b.size >= a.x &&
        yMax > a.y &&
        yMin < a.y + a.height) {
      b.applyPaddleBounce(a, this.sounds);
    }
  }

  checkScore() {
    if (this.ball.x <= 60) {
      this.scoreAi += 1;
      this.sounds.playPoint();
      if (this.scoreAi >= 11) { this.gameOver = true; return; }
      this.pause = true;
      this.server = "ai";
      this._scheduleAiServe();
    } else if (this.ball.x + this.ball.size >= this.cw - 60) {
      this.scoreP += 1;
      this.sounds.playPoint();
      if (this.scoreP >= 11) { this.gameOver = true; return; }
      this.pause = true;
      this.server = "player";
    }
  }

  _scheduleAiServe() {
    if (this.server !== "ai") return;
    clearTimeout(this.serveTimeoutId);
    const delay = (1 + Math.floor(Math.random() * 3)) * 1000;
    this.serveTimeoutId = setTimeout(() => {
      if (this.pause && !this.gameOver) this.pause = false;
    }, delay);
  }

  drawScore() {
    this.ctx.font = "40px Verdana";
    this.ctx.fillStyle = "#eeedf2";
    this.ctx.textAlign = "right";
    this.ctx.fillText(this.scoreP, this.cw / 2 - 30, 60);
    this.ctx.textAlign = "left";
    this.ctx.fillText(this.scoreAi, this.cw / 2 + 30, 60);

    if (this.scoreAi >= 11) {
      this.ctx.fillStyle = "#179ad4";
      this.ctx.textAlign = "center";
      this.ctx.fillText("Your opponent won!", this.cw / 2, 260);
    } else if (this.scoreP >= 11) {
      this.ctx.fillStyle = "#e0341e";
      this.ctx.textAlign = "center";
      this.ctx.fillText("You win!", this.cw / 2, 260);
    }
  }

  loop() {
    this.table.draw();

    if (this.pause) {
      const srv = this.server === "player" ? this.player : this.ai;
      const dir = this.server === "player" ? 1 : -1;
      this.ball.x = dir > 0
        ? srv.x + srv.width + 2
        : srv.x - this.ball.size - 2;
      this.ball.y = srv.y + srv.height / 2 - this.ball.size / 2;
      this.ball.speedX = 7 * dir;
      this.ball.speedY = 2;
      this.ball.hitCount = 0;
    }

    this.ball.draw();
    this.player.draw();
    this.ai.draw();
    this.drawScore();

    if (!this.pause) {
      this.ball.update();
      this.ai.update(this.ball);
      this.checkPaddleCollision();
      this.checkScore();
    }
  }
}
