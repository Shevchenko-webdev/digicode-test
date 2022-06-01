import {Graphics} from "pixi.js";

export class DrawPolygon {
  graphics: Graphics;
  sides: number;
  radius: number;
  angle: number;

  constructor(graphics: Graphics, sides: number, radius: number, angle?: number) {
    this.graphics = graphics
    this.sides = sides;
    this.radius = radius;
    this.angle = angle ? angle : 45;
  }

  drawPolygon() {
    let step = (Math.PI * 2) / this.sides;
    let start = (this.angle / 180) * Math.PI;
    let n, dx, dy;

    this.graphics.moveTo(
        Math.cos(start) * this.radius,
        -Math.sin(start) * this.radius
    );

    for (n = 1; n <= this.sides; ++n) {
      dx = Math.cos(start + (step * n)) * this.radius;
      dy = -Math.sin(start + (step * n)) * this.radius;
      this.graphics.lineTo(dx, dy);
    }
  }
}
