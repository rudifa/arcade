import * as PIXI from 'pixi.js';

import { RotatingSprite } from './sprites.js';
import { CircleButton, TextButton } from './buttons.js';
import { HexagonGrid } from './pixi-hexagrids.js';
import { HexagonCRKeyboard } from './pixi-shapes.js';

/**
 * Creates an Application
 * @param {*} options - standard PIXI.Application options
 */
export class AppPixi extends PIXI.Application {
  constructor(options) {
    super(options);
    console.log(`AppPixi › options`, options);

    this.addSprites(options);

    const hexagonSide = 30;
    this.addHexagonGrids(hexagonSide);

    this.addButtons(options);
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
    const button1 = new TextButton({
      onClick: (text) => {
        //console.log(text);
        this.gridVisible = !this.gridVisible;
        this.updateHexagonGrids();
      },
      x: options.width - 50,
      y: 50,
      text: 'grid',
    });
    this.stage.addChild(button1);

    const button2 = new TextButton({
      onClick: (text) => {
        //console.log(text);
        this.vertical = !this.vertical;
        this.updateHexagonGrids();
      },
      x: options.width - 50,
      y: 100,
      text: 'v/h',
    });
    this.stage.addChild(button2);
  }

  addHexagonGrids(hexagonSide) {
    this.gridVisible = true;
    this.vertical = true;
    this.gridVert = new HexagonGrid({
      cols: 20,
      rows: 20,
      side: hexagonSide,
      vertical: true,
      fillcolor: null,
      strokecolor: 0xff00ff,
    });
    this.gridHor = new HexagonGrid({
      cols: 22,
      rows: 20,
      side: hexagonSide,
      vertical: false,
      fillcolor: null,
      strokecolor: 0xffff00,
    });

    this.verticalMovableHexagon = new HexagonCRKeyboard({
      col: 7,
      row: 7,
      side: hexagonSide,
      vertical: true,
      strokecolor: 0xaa0000,
      fillcolor: null,
    });
    this.horizontalMovableHexagon = new HexagonCRKeyboard({
      col: 7,
      row: 7,
      side: hexagonSide,
      vertical: false,
      strokecolor: 0xaa0000,
      fillcolor: null,
    });

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
    if (this.vertical) {
      this.stage.removeChild(this.horizontalMovableHexagon);
      this.stage.addChild(this.verticalMovableHexagon);
    } else {
      this.stage.removeChild(this.verticalMovableHexagon);
      this.stage.addChild(this.horizontalMovableHexagon);
    }
  }
}
