import '../scss/styles.scss';
import {Playground} from "./playground/playground";

// wait dom load
document.addEventListener('DOMContentLoaded', () => {
  // create instance of Playground class
  const playground: Playground = new Playground();
  // init app
  playground.init();
  // watch shape count
  playground.app.ticker.add(() => {
    document.querySelector('#shapeCounter span')!.innerHTML = '' + playground.state.getShapeCount;
    document.querySelector('#shapeArea span')!.innerHTML = '' + playground.state.getArea;
  });

  // set default 'shapePerSec' and 'gravity' values
  document.querySelector('#shapePerSecValue')!.innerHTML = '' + playground.state.getSpeed;
  document.querySelector('#gravityValue')!.innerHTML = '' + playground.state.getGravity;

  // handle buttons
  document.querySelector('#increaseSpeed')!.addEventListener('click', () => {
    playground.state.setSpeed = +document.querySelector('#shapePerSecValue')!.innerHTML + 1;
    const shapePerSec = playground.state.getSpeed;
    if (+shapePerSec >= 10) {
      document.querySelector('#increaseSpeed')!.setAttribute('disabled', 'true');
    } else {
      document.querySelector('#increaseSpeed')!.removeAttribute('disabled');
    }
    document.querySelector('#decreaseSpeed')!.removeAttribute('disabled');
    document.querySelector('#shapePerSecValue')!.innerHTML = shapePerSec;
  });
  document.querySelector('#decreaseSpeed')!.addEventListener('click', () => {
    playground.state.setSpeed = +document.querySelector('#shapePerSecValue')!.innerHTML - 1;
    const shapePerSec = playground.state.getSpeed;
    if (+shapePerSec === 1) {
      document.querySelector('#decreaseSpeed')!.setAttribute('disabled', 'true');
    } else {
      document.querySelector('#decreaseSpeed')!.removeAttribute('disabled');
    }
    document.querySelector('#increaseSpeed')!.removeAttribute('disabled');
    document.querySelector('#shapePerSecValue')!.innerHTML = shapePerSec;
  });
  document.querySelector('#increaseGravity')!.addEventListener('click', () => {
    playground.state.setGravity = +document.querySelector('#gravityValue')!.innerHTML + 1;
    const gravity = playground.state.getGravity;
    if (+gravity >= 10) {
      document.querySelector('#increaseGravity')!.setAttribute('disabled', 'true');
    } else {
      document.querySelector('#increaseGravity')!.removeAttribute('disabled');
    }
    document.querySelector('#decreaseGravity')!.removeAttribute('disabled');
    document.querySelector('#gravityValue')!.innerHTML = gravity;
  });
  document.querySelector('#decreaseGravity')!.addEventListener('click', () => {
    playground.state.setGravity = +document.querySelector('#gravityValue')!.innerHTML - 1;
    const gravity = playground.state.getGravity;
    if (+gravity === 1) {
      document.querySelector('#decreaseGravity')!.setAttribute('disabled', 'true');
    } else {
      document.querySelector('#decreaseGravity')!.removeAttribute('disabled');
    }
    document.querySelector('#increaseGravity')!.removeAttribute('disabled');
    document.querySelector('#gravityValue')!.innerHTML = gravity;
  });
});
