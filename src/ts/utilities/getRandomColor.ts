import * as PIXI from 'pixi.js';

export class GetRandomColor {
  generateColor() {
    const hexColor = Math.floor(Math.random()*16777215).toString(16);
    return PIXI.utils.string2hex(hexColor);
  }
}
