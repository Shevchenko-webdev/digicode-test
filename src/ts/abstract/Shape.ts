import {Graphics} from 'pixi.js';

export abstract class Shape {
  abstract createShape(): Graphics;
}
