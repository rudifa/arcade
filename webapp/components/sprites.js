import * as PIXI from 'pixi.js';

/**
 * Creates a rotating sprite
 * @param {*} options
 * @param {*} options.x
 * @param {*} options.y
 * @param {*} options.imageUrl
 */
export class RotatingSprite extends PIXI.Sprite {
  constructor(options) {
    super(PIXI.Texture.from(options.imageURL));
    this.x = options.x;
    this.y = options.y;
    this.anchor.set(0.5);
    //console.log(`WebComponentsSprite`, options);
  }
  rotate(delta) {
    this.rotation += delta;
  }
}
