import * as PIXI from 'pixi.js';

/**
 * Provides pushbutton behavior for subclasses
 * On buttonUp calls fncButtonUp
 */
export let PushbuttonMixin = (superclass) =>
  class extends superclass {
    constructor(onClick, ...rest) {
      //console.log("PushbuttonMixin", ...arguments);
      super(...rest);
      this.onClick = onClick;
      try {
        this.anchor.set(0.5);
      } catch (error) {}
      this.interactive = true;
      this.buttonMode = true;

      this.on('click', () => {
        console.log('PushbuttonMixin', 'click');
        onClick(this.text);
      });

      this.on('pointerdown', () => {
        console.log('PushbuttonMixin', 'pointerdown');
        //onClick(this.text);
      });

      this.on('pointerup', () => {
        console.log('PushbuttonMixin', 'pointerup');
        //onClick(this.text);
      });

      this.on('pointerover', () => {
        console.log('PushbuttonMixin', 'pointerover');
        //onClick(this.text);
      });

      this.on('pointerout', () => {
        console.log('PushbuttonMixin', 'pointerout');
        //onClick(this.text);
      });
    }
  };

/**
 * Provides onClick behavior for subclasses
 * On click event calls onClick(text)
 *
 * @param {*} onClick - callback(text)
 * @param  {...any} rest - arguments for the superclass
 */
export let ClickMixin = (superclass) =>
  class extends superclass {
    constructor(onClick, ...rest) {
      //console.log("ClickMixin", ...arguments);
      super(...rest);
      try {
        this.anchor.set(0.5);
      } catch (error) {}
      this.interactive = true;
      this.buttonMode = true;

      // IN arcade ONLY THIS DOES NOT RESPOND
      this.on('click', () => {
        console.log('ClickMixin', 'click');
        onClick(this.text);
      });

      this.on('pointerdown', () => {
        console.log('ClickMixin', 'pointerdown');
        onClick(this.text);
      });
    }
  };

/**
 * Displays the text
 */
export class Text extends PIXI.Text {
  constructor(x, y, text) {
    super(text, {
      font: 'bold 32px Helvetica',
      fill: '#0077ff',
    });
    this.x = x;
    this.y = y;
  }
}

/**
 * Creates a circle
 *
 * @param {*} x
 * @param {*} y
 * @param {*} radius
 * @param {*} fillcolor
 * @param {*} strokecolor
 */
export class Circle3 extends PIXI.Graphics {
  constructor(x, y, radius, fillcolor, strokecolor, text) {
    super();
    this.lineStyle(1, strokecolor);
    this.beginFill(fillcolor, 1.0);
    this.drawCircle(0, 0, radius);
    this.endFill();
    this.text = text;
    this.x = x;
    this.y = y;
  }
}

/**
 * Creates a text pushbutton
 * On click event calls onClick
 *  app.stage.addChild(
 *      new TextButton2(350, 30, "five", (text) => console.log(text))
 *  );
 *
 * @param {*} onClick - callback(text)
 * @param {*} x - center.x
 * @param {*} y - center.y
 * @param {*} text - button text + identifier in callback
 */
export class TextButton extends ClickMixin(Text) {
  constructor(onClick, x, y, text) {
    console.log('TextButton', ...arguments);
    super(...arguments);
  }
}

/**
 * Creates a circle pushbutton
 * On click calls onClick
 *
 * @param {*} onClick - callback()
 * @param {*} x
 * @param {*} y
 * @param {*} radius
 * @param {*} fillcolor
 * @param {*} strokecolor
 *
 * Usage example:
 *   menuApplication.stage.addChild(
 *       new CircleButton(replaceCurrentApp, 320, 30, 15, 0xffffff, 0x000000)
 *   );
 */
export class CircleButton extends PushbuttonMixin(Circle3) {
  constructor(onClick, x, y, radius, fillcolor, strokecolor) {
    //console.log("CircleButton", ...arguments);
    super(...arguments);
  }
}
