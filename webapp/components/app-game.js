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
    };
    console.log(`AppGame › new Application( ${clientWidth}x${clientHeight}px)`);
    this.app = new Application(options);
    this.containerEl.appendChild(this.app.view);
  }

  render() {
    return html`<div id="container"></div>`;
  }
}

class Application extends PIXI.Application {
  constructor(options) {
    super(options);
    console.log(`Application › options`, options);

    this.addWebComponentsSprite(options);
  }

  addWebComponentsSprite(options) {
    this.loader
      .add('circle', '/assets/apple-touch-icon.png')
      .load((loader, resources) => {
        const circle = new PIXI.Sprite(resources.circle.texture);
        circle.x = options.width / 2;
        circle.y = options.height / 2;
        circle.anchor.x = 0.5;
        circle.anchor.y = 0.5;
        console.log(`AppGame › makeCircle()`, circle);
        this.stage.addChild(circle);
        this.ticker.add(() => {
          circle.rotation += 0.01;
        });
      });
  }
}
