import * as PIXI from 'pixi.js';

import { RotatingSprite } from './sprites.js';
import { CircleButton, TextButton } from './buttons.js';
import {
  HexagonGrid,
  HexagonGroupFixed,
  HexagonGroupFromLayout,
} from './pixi-hexagrids.js';

import { HexagonCRKeyboard } from './shapes.js';

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
    this.addHexagonGrids(hexagonSide, options);
    this.addMovableHexagons(hexagonSide);
    this.addHexagonGroups(hexagonSide);
    this.addButtons(options);

    this.updateHexagonCollections();
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
        this.updateHexagonCollections();
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
        this.updateHexagonCollections();
      },
      x: options.width - 50,
      y: 100,
      text: 'v/h',
    });
    this.stage.addChild(button2);
  }

  addHexagonGrids(hexagonSide, options) {
    this.gridVisible = true;
    this.vertical = true;
    this.gridVert = new HexagonGrid({
      //   cols: 20,
      //   rows: 20,
      width: options.width,
      height: options.height,
      side: hexagonSide,
      vertical: true,
      fillcolor: null,
      strokecolor: 0xff00ff,
    });
    this.gridHor = new HexagonGrid({
      //   cols: 22,
      //   rows: 20,
      width: options.width,
      height: options.height,
      side: hexagonSide,
      vertical: false,
      fillcolor: null,
      strokecolor: 0xffff00,
    });
  }

  addMovableHexagons(hexagonSide) {
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
  }

  addHexagonGroups(hexagonSide) {
    // this.hexagonGroupVertical = new HexagonGroupFixed({
    this.hexagonGroupVertical = new HexagonGroupFromLayout({
      side: hexagonSide,
      vertical: true,
      fillcolor: 0x009900,
    });
    // this.hexagonGroupHorizontal = new HexagonGroupFixed({
    this.hexagonGroupHorizontal = new HexagonGroupFromLayout({
      side: hexagonSide,
      vertical: false,
      fillcolor: 0x0000ff,
    });
  }

  updateHexagonCollections() {
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
      this.stage.removeChild(this.hexagonGroupHorizontal);
      this.stage.addChild(this.hexagonGroupVertical);
    } else {
      this.stage.removeChild(this.hexagonGroupVertical);
      this.stage.addChild(this.hexagonGroupHorizontal);
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
