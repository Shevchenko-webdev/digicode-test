import * as PIXI from 'pixi.js';
import {DrawPolygon} from '../utilities/drawPolygon';
import {GetRandomColor} from "../utilities/getRandomColor";
import {Shape} from '../abstract/Shape'
import {Graphics} from "pixi.js";

export class Rectangle implements Shape {
  size: number;

  constructor(size: number) {
    this.size = size
  }

  createShape(): Graphics {
    const graphics = new PIXI.Graphics();

    graphics.beginFill(new GetRandomColor().generateColor(), 1);
    new DrawPolygon(graphics, 4, this.size).drawPolygon();
    graphics.endFill()

    return graphics;
  }
}

export class Circle implements Shape {
  size: number;

  constructor(size: number) {
    this.size = size;
  }

  createShape(): Graphics {
    const graphics = new PIXI.Graphics();

    graphics.beginFill(new GetRandomColor().generateColor(), 1);
    graphics.drawCircle(0, 0, this.size);
    graphics.endFill();

    return graphics;
  }
}

export class Ellipse implements Shape {
  size: number;

  constructor(size: number) {
    this.size = size;
  }

  createShape(): Graphics {
    const graphics = new PIXI.Graphics();

    graphics.beginFill(new GetRandomColor().generateColor(), 1);
    graphics.drawEllipse(0, 0, this.size, this.size / 2);
    graphics.endFill();

    return graphics;
  }
}

export class Triangle implements Shape {
  size: number;

  constructor(size: number) {
    this.size = size;
  }

  createShape(): Graphics {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(new GetRandomColor().generateColor(), 1);
    new DrawPolygon(graphics, 3, this.size).drawPolygon();
    graphics.endFill();

    return graphics;
  }
}

export class Pentagon implements Shape {
  size: number;

  constructor(size: number) {
    this.size = size;
  }

  createShape(): Graphics {
    const graphics = new PIXI.Graphics();

    graphics.beginFill(new GetRandomColor().generateColor(), 1);
    new DrawPolygon(graphics, 5, this.size).drawPolygon();
    graphics.endFill();

    return graphics;
  }
}

export class Hexagon implements Shape {
  size: number;

  constructor(size: number) {
    this.size = size;
  }

  createShape(): Graphics {
    const graphics = new PIXI.Graphics();

    graphics.beginFill(new GetRandomColor().generateColor(), 1);
    new DrawPolygon(graphics, 6, this.size).drawPolygon();
    graphics.endFill();

    return graphics;
  }
}

export class Custom implements Shape {
  baseSize: number

  constructor(baseSize: number) {
    this.baseSize = baseSize;
  }

  createShape(): Graphics {
    const graphics = new PIXI.Graphics();

    graphics.beginFill(new GetRandomColor().generateColor(), 1);

    graphics.drawRect(0, 0, this.baseSize, this.baseSize);
    graphics.bezierCurveTo(0, 0, this.baseSize / 2, 0 - this.baseSize / 2, this.baseSize, 0)
    graphics.drawCircle(0, this.baseSize / 4, this.baseSize / 4);
    graphics.drawCircle(0, 3 * (this.baseSize / 4), this.baseSize / 4);
    graphics.drawCircle(this.baseSize, this.baseSize / 4, this.baseSize / 4);
    graphics.drawCircle(this.baseSize, 3 * (this.baseSize / 4), this.baseSize / 4);
    graphics.moveTo(0, this.baseSize);
    graphics.bezierCurveTo(0, this.baseSize, this.baseSize / 2, this.baseSize + this.baseSize / 2, this.baseSize, this.baseSize)
    graphics.endFill();

    return graphics;
  }
}
