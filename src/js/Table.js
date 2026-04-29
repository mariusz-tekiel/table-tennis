export default class Table {
  constructor(ctx, cw, ch) {
    this.ctx = ctx;
    this.cw = cw;
    this.ch = ch;

    this.surfaceGrad = ctx.createLinearGradient(0, 0, 0, ch);
    this.surfaceGrad.addColorStop(0,   "#174f0e");
    this.surfaceGrad.addColorStop(0.5, "#1e6415");
    this.surfaceGrad.addColorStop(1,   "#174f0e");

    this.vignetteGrad = ctx.createRadialGradient(cw * 0.5, ch * 0.5, ch * 0.1, cw * 0.5, ch * 0.5, cw * 0.68);
    this.vignetteGrad.addColorStop(0, "rgba(0,0,0,0)");
    this.vignetteGrad.addColorStop(1, "rgba(0,0,0,0.52)");

    this.lightGrad = ctx.createRadialGradient(cw * 0.5, ch * 0.5, 0, cw * 0.5, ch * 0.5, cw * 0.45);
    this.lightGrad.addColorStop(0, "rgba(255,255,255,0.07)");
    this.lightGrad.addColorStop(1, "rgba(0,0,0,0)");
  }

  draw() {
    const ctx = this.ctx;
    const cw = this.cw;
    const ch = this.ch;

    ctx.fillStyle = this.surfaceGrad;
    ctx.fillRect(0, 0, cw, ch);

    ctx.fillStyle = this.vignetteGrad;
    ctx.fillRect(0, 0, cw, ch);

    ctx.fillStyle = this.lightGrad;
    ctx.fillRect(0, 0, cw, ch);

    ctx.strokeStyle = "rgba(255,255,255,0.88)";
    ctx.lineWidth = 4;
    ctx.strokeRect(5, 5, cw - 10, ch - 10);

    ctx.fillStyle = "rgba(0,0,0,0.18)";
    ctx.fillRect(cw / 2 - 5, 0, 10, ch);

    for (let y = 8; y < ch - 8; y += 24) {
      ctx.fillStyle = "rgba(220,220,220,0.82)";
      ctx.fillRect(cw / 2 - 3, y, 6, 15);
    }
  }
}
