import * as PIXI from 'pixi.js'
import {Application, Graphics} from 'pixi.js'
import {State} from "../state/state";
import {EventSystem, FederatedPointerEvent} from '@pixi/events';
import {Circle, Custom, Ellipse, Hexagon, Pentagon, Rectangle, Triangle} from "../models/shape-types";
import {GetArea} from "../utilities/getArea";


export class Playground {
  state: State;
  app: Application;
  getArea: GetArea;

  constructor() {
    this.getArea = new GetArea();
  }


  init(): void {
    this.state = new State();

    // Pixi.js v6 - remove Interaction plugin
    delete PIXI.Renderer.__plugins.interaction

    this.app = new PIXI.Application({...this.state.applicationConfig})

    document.querySelector('#playgroundWrapper')?.appendChild(this.app.view);

    // Pixi.js v6 - add EventSystem plugin
    if (!('events' in this.app.renderer)) {
      this.app.renderer.addSystem(EventSystem, 'events');
    }

    // @ts-ignore
    this.app.stage.interactive = true;
    // @ts-ignore
    this.app.stage.hitArea = this.app.renderer.screen;

    this.startShapeRain();

    // check if shape moved lower than app bottom border and remove it
    this.app.ticker.add(() => {
      this.app.stage.children.forEach(shape => {
        if (shape instanceof Graphics) {
          shape.y += +this.state.getGravity;
          if (shape.y - 50 > this.state.applicationConfig.height) {
            this.removeShape(shape);
          }
        }
      })
    });

    // handler click
    // @ts-ignore
    this.app.stage.on('click', (e: FederatedPointerEvent) => {
      if (e.target instanceof Graphics) {
        // click over shape
        // @ts-ignore
        const type = e.target.name
        this.removeShape(e.target);
        this.app.stage.children.forEach(shape => {
          const position = {x: shape.position.x, y: shape.position.y};
          // @ts-ignore
          if (shape.name === type) {
            this.addShape('replaceEvent', type, position);
            this.removeShape(shape as Graphics);
          }
        })
      } else {
        // click over empty area
        this.addShape(e);
      }
    });
  }

  startShapeRain(): void {
    // watch ticker
    this.app.ticker.addOnce(() => {
      this.addShape();
      // add shape each 'shapePerSec' seconds
      setTimeout(() => {
        this.startShapeRain();
      }, 1000 / +this.state.getSpeed);
    });
  }

  addShape(event?: 'replaceEvent' | FederatedPointerEvent, type?: string, position?: { x: number, y: number }): void {
    // choose type of surface
    const shapeType = type ? type : this.state.chooseShapeType();
    // based on a circle circumscribed around the shape
    const shapeSize = this.state.getShapeSize;
    let customShapeSize = this.state.getCustomShapeSize;

    let shapeInstance;
    // handle type of shape
    switch (shapeType) {
      case "circle":
        shapeInstance = new Circle(shapeSize)
        break;
      case "ellipse":
        shapeInstance = new Ellipse(shapeSize);
        break;
      case "triangle":
        shapeInstance = new Triangle(shapeSize);
        break;
      case "rectangle":
        shapeInstance = new Rectangle(shapeSize);
        break;
      case "pentagon":
        shapeInstance = new Pentagon(shapeSize);
        break;
      case "hexagon":
        shapeInstance = new Hexagon(shapeSize);
        break;
      case "custom-shape":
        shapeInstance = new Custom(customShapeSize);
        break;
      default:
        throw new Error('Undefined shape type');
    }

    const shape: Graphics = shapeInstance.createShape();
    shapeType === 'custom-shape' ?
        this.state.increaseArea(this.getArea.getArea(shapeType, customShapeSize)) :
        this.state.increaseArea(this.getArea.getArea(shapeType, shapeSize))


    // set shape position (mouse pointer position | random 'x' value)
    if (event === 'replaceEvent') {
      if (position) {
        shape.position.set(position.x, position.y);
      }
    } else {
      event ?
          shape.position.set(event.screen.x, event.screen.y) :
          shape.position.set(this.state.countShapePosition(), shapeType === 'custom-shape' ? -shapeSize - customShapeSize / 2 : -shapeSize);
    }
    // insert shape
    this.app.stage.addChild(shape);
    // @ts-ignore
    shape.cursor = 'pointer';
    // @ts-ignore
    shape.name = shapeType;
    // @ts-ignore
    shape.interactive = true;

    // update shape total number
    this.state.setShapeCount = this.app.stage.children.length;
  }

  removeShape(shape: Graphics): void {
    // remove shape
    this.app.stage.removeChild(shape);

    // @ts-ignore
    this.state.decreaseArea(this.getArea.getArea(shape.name, this.state.getShapeSize));

    // update shape total number
    this.state.setShapeCount = this.app.stage.children.length;
  }
}

