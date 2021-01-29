import * as PIXI from 'pixi.js';

import { RotatingSprite } from './sprites.js';

/**
 * Creates an Application
 * @param {*} options - standard PIXI.Application options
 */
export class AppPixi extends PIXI.Application {
  constructor(options) {
    super(options);
    console.log(`AppPixi › options`, options);

    this.addSprites(options);
  }

  addSprites(options) {
    const sprite1 = new RotatingSprite({
      x: options.width / 2,
      y: options.height / 2,
      imageURL: '/assets/open-wc-logo-180x180.png',
    });
    this.stage.addChild(sprite1);
    this.ticker.add(() => sprite1.rotate(0.01));

    const sprite2 = this.stage.addChild(
      new RotatingSprite({
        x: options.width / 3,
        y: options.height / 3,
        imageURL: '/assets/open-wc-logo-180x180.png',
      }),
    );
    this.stage.addChild(sprite2);
    this.ticker.add(() => sprite2.rotate(-0.01));
  }
}
