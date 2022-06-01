export class State {
  // playground config
  applicationConfig: { width: number; height: number; background?: number; resolution?: number; } = {
    width: window.innerWidth * .8,
    height: window.innerHeight * .8
  };

  // shape per sec
  private shapePerSec = 1;
  private shapeSize = 50;
  private customShapeSize = 60;
  // gravity value
  private gravity = 1;
  // total number of shapes displayed inside playground at the same time
  private shapeCount = 0;
  private totalShapeArea = 0;

  // shape types
  shapeTypes = ['circle', 'ellipse', 'triangle', 'rectangle', 'pentagon', 'hexagon', 'custom-shape'];

  get getShapeSize(): number{
    return this.shapeSize;
  }

  get getCustomShapeSize(): number{
    return this.customShapeSize;
  }

  get getSpeed(): string {
    return '' + this.shapePerSec;
  }

  get getGravity(): string {
    return '' + this.gravity;
  }

  get getShapeCount(): number {
    return this.shapeCount;
  }

  get getArea(): number {
    return this.totalShapeArea;
  }

  set setSpeed(value: number) {
    this.shapePerSec = value;
  }

  set setGravity(value: number) {
    this.gravity = value;
  }

  set setShapeCount(value: number) {
    this.shapeCount = value;
  }

  increaseArea(value: number) {
    this.totalShapeArea += value;
  }

  decreaseArea(value: number) {
    this.totalShapeArea -= value;
  }

  chooseShapeType(): string {
    return this.shapeTypes[Math.floor(Math.random() * this.shapeTypes.length)];
  }

  countShapePosition(): number {
    const min = 75;
    const max = this.applicationConfig.width - 75;
    return Math.floor(Math.random() * max) + min;
  }
}
