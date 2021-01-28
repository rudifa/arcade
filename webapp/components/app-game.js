import { LitElement, html, css } from 'lit-element';
import { customElement, internalProperty, query } from 'lit-element';
import * as PIXI from 'pixi.js';

@customElement('app-game')
export class AppGame extends LitElement {
  @internalProperty({ type: Object }) app;

  @internalProperty({ type: Object })
  static pixiAppOptions = {
    backgroundColor: 0xffffff,
    antialias: true,
    autoDensity: true, // !!!
    resolution: 2,
  };

  @query('div#container') containerEl;

  static get styles() {
    return css`
      :host {
        display: block;
        height: 100vh;
      }
      div#container {
        width: 100%;
        height: 100%;
      }
    `;
  }

  constructor() {
    super();
  }

  firstUpdated() {
    super.firstUpdated();
    const { clientWidth, clientHeight } = this.containerEl;
    const options = {
      ...this.pixiAppOptions,
      width: clientWidth,
      height: clientHeight,
      backgroundColor: 0xbbccee,
    };
    console.log(`AppGame › new Application( ${clientWidth}x${clientHeight}px)`);
    this.app = new Application(options);
    this.containerEl.appendChild(this.app.view);
  }

  render() {
    return html`<div id="container"></div>`;
  }
}

/**
 * Creates an Application
 * @param {*} options - standard PIXI.Application options
 */
class Application extends PIXI.Application {
  constructor(options) {
    super(options);
    console.log(`Application › options`, options);

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
