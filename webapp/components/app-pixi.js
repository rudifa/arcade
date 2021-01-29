import * as PIXI from 'pixi.js';

import { RotatingSprite } from './sprites.js';
import { CircleButton, TextButton } from './buttons.js';
import { HexagonCRGrid as HexagonGrid } from './pixi-hexagrids.js';

/**
 * Creates an Application
 * @param {*} options - standard PIXI.Application options
 */
export class AppPixi extends PIXI.Application {
  constructor(options) {
    super(options);
    console.log(`AppPixi › options`, options);

    this.addSprites(options);
    this.addButtons(options);

    const hexagonSide = 30;
    this.addHexagonGrids(hexagonSide);
  }

  addSprites(options) {
    const sprite1 = new RotatingSprite({
      x: 0,
      y: 0,
      imageURL: '/assets/open-wc-logo-180x180.png',
    });
    this.stage.addChild(sprite1);
    this.ticker.add(() => sprite1.rotate(0.01));
  }

  addButtons(options) {
    const button1 = new TextButton(
      (text) => {
        //console.log(text);
        this.gridVisible = !this.gridVisible;
        this.updateHexagonGrids();
      },
      options.width - 50,
      50,
      'grid',
    );
    this.stage.addChild(button1);

    const button2 = new TextButton(
      (text) => {
        //console.log(text);
        this.vertical = !this.vertical;
        this.updateHexagonGrids();
      },
      options.width - 50,
      100,
      'v/h',
    );
    this.stage.addChild(button2);
  }

  addHexagonGrids(hexagonSide) {
    this.gridVisible = true;
    this.vertical = true;
    this.gridVert = new HexagonGrid(20, 20, hexagonSide, true, null, 0xff00ff);
    this.gridHor = new HexagonGrid(22, 20, hexagonSide, false, null, 0xff00ff);
    this.updateHexagonGrids();
  }

  updateHexagonGrids() {
    if (this.gridVisible) {
      if (this.vertical) {
        this.stage.removeChild(this.gridHor);
        this.stage.addChild(this.gridVert);
      } else {
        this.stage.removeChild(this.gridVert);
        this.stage.addChild(this.gridHor);
      }
    } else {
      this.stage.removeChild(this.gridVert);
      this.stage.removeChild(this.gridHor);
    }
  }
}
