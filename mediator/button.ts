import { Mediator } from "./mediator";

class Button {
  private mediator: Mediator;
  private text: string;
  private disabled: boolean;
  constructor(text: string, disabled: boolean) {
    this.text = text;
    this.disabled = disabled;
  }
  setMediator(mediator: Mediator) {
    this.mediator = mediator;
  }
  click() {
    if (this.disabled) {
      console.log(`can't click disabled ${this.text} button`)
    };
    if (this.mediator) {
      this.mediator.notify(this, "ButtonClicked");
    }
    console.log(`${this.text} button is clicked`)
  }
  disable() {
    this.disabled = true;
    if (this.mediator) {
      this.mediator.notify(this, "ButtonDisabled");
    }
    console.log(`${this.text} button is disabled`)
  }
  enabled() {
    this.disabled = false;
    if (this.mediator) {
      this.mediator.notify(this, "ButtonEnabled");
    }
    console.log(`${this.text} button is enabled`)
  }
}

export { Button };
